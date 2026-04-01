import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import BrandLogo from '../BrandLogo/BrandLogo';
import { CONTACT_EMAIL, useI18n } from '../../i18n';
import { resolveApiBaseUrl } from '../../lib/apiUrls';
import './CheckoutModal.css';

const STEPS = ['IDENTIFICATION', 'METHOD_SELECTION', 'PAYMENT'];
const API_URL = resolveApiBaseUrl(import.meta.env.VITE_API_URL);
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supportEmail = CONTACT_EMAIL;

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll(focusableSelector));
}

export default function CheckoutModal({ isOpen, onClose, productName, price }) {
    const { content } = useI18n();
    const { checkout } = content;
    const containerRef = useRef(null);
    const previousFocusRef = useRef(null);
    const [step, setStep] = useState('IDENTIFICATION');
    const [paymentMethod, setPaymentMethod] = useState('PIX');
    const [form, setForm] = useState({ name: '', email: '' });
    const [timeLeft, setTimeLeft] = useState(600);
    const [copied, setCopied] = useState('');
    const [purchaseState, setPurchaseState] = useState({ type: '', message: '' });
    const [purchaseSending, setPurchaseSending] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setStep('IDENTIFICATION');
            setPaymentMethod('PIX');
            setTimeLeft(600);
            setCopied('');
            setPurchaseState({ type: '', message: '' });
            setPurchaseSending(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.body.classList.toggle('z-modal-open', isOpen);
        return () => document.body.classList.remove('z-modal-open');
    }, [isOpen]);

    useEffect(() => {
        if (step === 'PAYMENT' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    useEffect(() => {
        if (!copied) return undefined;
        const timer = setTimeout(() => setCopied(''), 1800);
        return () => clearTimeout(timer);
    }, [copied]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        previousFocusRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        const timer = window.requestAnimationFrame(() => {
            const primaryTarget = containerRef.current?.querySelector('[data-modal-primary="true"]');
            if (primaryTarget instanceof HTMLElement) {
                primaryTarget.focus();
                return;
            }

            const focusables = getFocusableElements(containerRef.current);
            if (focusables.length > 0) {
                focusables[0].focus();
            } else {
                containerRef.current?.focus();
            }
        });

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusables = getFocusableElements(containerRef.current);
            if (!focusables.length) {
                event.preventDefault();
                containerRef.current?.focus();
                return;
            }

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.cancelAnimationFrame(timer);
            document.removeEventListener('keydown', handleKeyDown);
            previousFocusRef.current?.focus?.();
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const primaryTarget = containerRef.current?.querySelector('[data-modal-primary="true"]');
        if (primaryTarget instanceof HTMLElement) {
            primaryTarget.focus();
            return;
        }

        const focusables = getFocusableElements(containerRef.current);
        focusables[0]?.focus();
    }, [isOpen, step]);

    if (!isOpen) return null;

    const currentStep = STEPS.indexOf(step) + 1;

    const handleNext = (e) => {
        e.preventDefault();
        if (form.name && form.email) {
            setStep('METHOD_SELECTION');
        }
    };

    const handleSelectMethod = (method) => {
        setPaymentMethod(method);
        setPurchaseState({ type: '', message: '' });
        setStep('PAYMENT');
    };

    const goBack = () => {
        if (step === 'PAYMENT') {
            setStep('METHOD_SELECTION');
            return;
        }
        if (step === 'METHOD_SELECTION') {
            setStep('IDENTIFICATION');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateCRC16 = (str) => {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) {
                    crc = (crc << 1) ^ 0x1021;
                } else {
                    crc <<= 1;
                }
            }
        }
        return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    };

    const generatePixPayload = (key, name, city, amount, reference) => {
        const pad = (id, value) => {
            if (!value) return '';
            const valStr = value.toString();
            const len = valStr.length.toString().padStart(2, '0');
            return `${id}${len}${valStr}`;
        };

        const merchantInfo = pad('00', 'br.gov.bcb.pix') + pad('01', key);

        let payload =
            pad('00', '01') +
            pad('26', merchantInfo) +
            pad('52', '0000') +
            pad('53', '986') +
            pad('54', amount ? amount.toString() : '0.00') +
            pad('58', 'BR') +
            pad('59', (name || 'MERCHANT').substring(0, 25)) +
            pad('60', (city || 'CITY').substring(0, 15)) +
            pad('62', pad('05', reference || 'PAY')) +
            '6304';

        return payload + calculateCRC16(payload);
    };

    const pixKey = import.meta.env.VITE_PIX_KEY;
    const merchantName = import.meta.env.VITE_PIX_NAME || 'ZEUS';
    const merchantCity = import.meta.env.VITE_PIX_CITY || 'SAO PAULO';
    const usdtAddress = import.meta.env.VITE_USDT_POLYGON_ADDRESS;

    const pixPayload = generatePixPayload(
        pixKey,
        merchantName,
        merchantCity,
        price,
        'QELOX'
    );

    const paymentValue = paymentMethod === 'PIX' ? pixPayload : usdtAddress;
    const paymentLabel = paymentMethod === 'PIX' ? checkout.pix.label : checkout.crypto.label;
    const paymentHint = paymentMethod === 'PIX'
        ? checkout.pix.hint
        : checkout.crypto.hint(supportEmail);
    const paymentMethodLabel = paymentMethod === 'PIX' ? checkout.pix.banner : checkout.crypto.banner;
    const paymentStatus = paymentMethod === 'PIX' ? checkout.pix.status : checkout.crypto.status;
    const scanLabel = paymentMethod === 'PIX' ? checkout.pix.scan : checkout.crypto.scan;
    const copyFeedbackLabel = paymentMethod === 'PIX' ? checkout.pix.copyFeedback : checkout.crypto.copyFeedback;
    const copyHelp = paymentMethod === 'PIX' ? checkout.pix.help : checkout.crypto.help;

    const shortValue = !paymentValue
        ? checkout.configurationPending
        : paymentMethod === 'PIX'
            ? `${paymentValue.substring(0, 30)}...`
            : paymentValue;

    const handleCopy = async (text) => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(copyFeedbackLabel);
    };

    const handlePurchaseConfirmation = async () => {
        setPurchaseSending(true);
        setPurchaseState({ type: '', message: '' });

        try {
            const response = await fetch(`${API_URL}/api/qelox/purchase-confirmation`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(ANON_KEY ? { Authorization: `Bearer ${ANON_KEY}` } : {}),
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    productName,
                    paymentMethod,
                }),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || `HTTP ${response.status}`);
            }

            setPurchaseState({
                type: 'success',
                message: checkout.deliverySuccess,
            });
        } catch (error) {
            setPurchaseState({
                type: 'error',
                message: error.message || checkout.deliveryError,
            });
        } finally {
            setPurchaseSending(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose} role="presentation">
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="checkout-modal-title"
                aria-describedby="checkout-modal-description"
                tabIndex={-1}
                ref={containerRef}
            >
                <div className="modal-ambient" />
                <div className="modal-grid" />

                <button type="button" className="modal-close" onClick={onClose} aria-label={checkout.closeAria}>
                    ×
                </button>

                <div className="modal-header">
                    <div className="header-left">
                        <div className="modal-brand-row">
                            <BrandLogo variant="inline" size="sm" className="modal-brand-logo" />
                            <span className="modal-brand-row__label">{checkout.brandRowLabel}</span>
                        </div>
                        <span className="modal-tag">{checkout.tag}</span>
                        <h2 className="modal-title" id="checkout-modal-title">{productName}</h2>
                        <p className="modal-subtitle" id="checkout-modal-description">
                            {checkout.subtitle}
                        </p>
                        <div className="modal-header__chips" aria-label={checkout.highlightsLabel}>
                            {checkout.chips.map((chip) => (
                                <span className="modal-chip" key={chip}>{chip}</span>
                            ))}
                        </div>
                    </div>
                    <div className="modal-pricebox">
                        <span className="modal-pricebox__label">{checkout.currentAccess}</span>
                        <div className="modal-price">R$ {price}</div>
                        <span className="modal-pricebox__hint">{checkout.releaseAccess}</span>
                    </div>
                </div>

                <div className="modal-steps" aria-hidden="true">
                    {checkout.stepLabels.map((label, index) => (
                        <div
                            key={label}
                            className={`modal-step${currentStep >= index + 1 ? ' active' : ''}`}
                        >
                            <span className="modal-step__num">0{index + 1}</span>
                            <span className="modal-step__label">{label}</span>
                        </div>
                    ))}
                </div>

                <div className="modal-body">
                    {step === 'IDENTIFICATION' ? (
                        <form className="checkout-form" onSubmit={handleNext}>
                            <div className="modal-section-intro">
                                <span className="modal-section-tag">{checkout.stepNumbers[0]}</span>
                                <p>{checkout.step01}</p>
                            </div>
                            <div className="checkout-hintbar">
                                <span className="checkout-hintbar__item">{checkout.usedForAccess}</span>
                                <span className="checkout-hintbar__item">{checkout.usedForFollowUp}</span>
                            </div>
                            <div className="form-group">
                                <label>{checkout.fullName}</label>
                                <input
                                    type="text"
                                    placeholder={checkout.placeholders.name}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    data-modal-primary="true"
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-group">
                                <label>{checkout.deliveryEmail}</label>
                                <input
                                    type="email"
                                    placeholder={checkout.placeholders.email}
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="btn-modal-primary">
                                    {checkout.continue}
                                </button>
                            </div>
                        </form>
                    ) : step === 'METHOD_SELECTION' ? (
                        <div className="method-selection">
                            <div className="modal-section-intro">
                                <span className="modal-section-tag">{checkout.stepNumbers[1]}</span>
                                <p>{checkout.step02}</p>
                            </div>
                            <div className="checkout-context">
                                <div className="checkout-context__item">
                                    <span className="checkout-context__label">{checkout.buyer}</span>
                                    <strong>{form.name}</strong>
                                </div>
                                <div className="checkout-context__item">
                                    <span className="checkout-context__label">{checkout.delivery}</span>
                                    <strong>{form.email}</strong>
                                </div>
                            </div>
                            <p className="selection-label">{checkout.selectMethod}</p>
                            <div className="method-cards">
                                <button type="button" className="method-card" onClick={() => handleSelectMethod('PIX')} data-modal-primary="true">
                                    <div className="method-icon">PIX</div>
                                    <div className="method-info">
                                        <span className="method-name">{checkout.pix.name}</span>
                                        <span className="method-desc">{checkout.pix.desc}</span>
                                    </div>
                                    <div className="method-arrow">→</div>
                                </button>
                                <button type="button" className="method-card" onClick={() => handleSelectMethod('CRYPTO')}>
                                    <div className="method-icon">USDT</div>
                                    <div className="method-info">
                                        <span className="method-name">{checkout.crypto.name}</span>
                                        <span className="method-desc">{checkout.crypto.desc}</span>
                                    </div>
                                    <div className="method-arrow">→</div>
                                </button>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-modal-secondary" onClick={goBack}>
                                    {checkout.changeMethod}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="payment-step">
                            <div className="modal-section-intro">
                                <span className="modal-section-tag">{checkout.stepNumbers[2]}</span>
                                <p>{checkout.step03}</p>
                            </div>

                            <div className="payment-topbar">
                                <div className="payment-status">
                                    <span className="status-dot blink" />
                                    {paymentStatus}
                                </div>
                                <div className="payment-timer">
                                    {checkout.paymentWindow} <span className="highlight">{formatTime(timeLeft)}</span>
                                </div>
                            </div>

                            <div className="payment-method-banner">
                                <span className="payment-method-banner__label">{checkout.selectedRail}</span>
                                <strong>{paymentMethodLabel}</strong>
                            </div>

                            <div className="payment-grid">
                                <div className="qr-code-panel">
                                    <div className="qr-code-meta">
                                        <span>{scanLabel}</span>
                                        <strong>{paymentMethod}</strong>
                                    </div>
                                    <div className="qr-code-wrapper">
                                        <div className="qr-code-container">
                                            {paymentValue ? (
                                                <QRCodeSVG
                                                    value={paymentValue}
                                                    size={210}
                                                    level="H"
                                                    includeMargin={true}
                                                />
                                            ) : (
                                                <div className="qr-error">{checkout.configurationPending}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <div className="payment-detail payment-detail--summary">
                                        <span className="small-label">{checkout.accessSummary}</span>
                                        <div className="checkout-context checkout-context--compact">
                                            <div className="checkout-context__item">
                                                <span className="checkout-context__label">{checkout.product}</span>
                                                <strong>{productName}</strong>
                                            </div>
                                            <div className="checkout-context__item">
                                                <span className="checkout-context__label">{checkout.buyer}</span>
                                                <strong>{form.name}</strong>
                                            </div>
                                            <div className="checkout-context__item">
                                                <span className="checkout-context__label">{checkout.delivery}</span>
                                                <strong>{form.email}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-detail">
                                        <span className="small-label">{paymentLabel}</span>
                                        <div className="copy-box">
                                            <input readOnly value={shortValue} />
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(paymentValue)}
                                                disabled={!paymentValue}
                                                data-modal-primary="true"
                                            >
                                                {checkout.copy}
                                            </button>
                                        </div>
                                        <div className={`copy-feedback${copied ? ' visible' : ''}`}>
                                            {copied || ' '}
                                        </div>
                                        <p className="copy-support">
                                            {copyHelp}
                                        </p>
                                    </div>

                                    <div className="payment-detail payment-detail--note">
                                        <span className="small-label">{checkout.instructions}</span>
                                        <p className="payment-note">{paymentHint}</p>
                                    </div>
                                    <div className="payment-detail payment-detail--confirmation">
                                        <span className="small-label">{checkout.finalizeEmail}</span>
                                        <p className="payment-note">
                                            {checkout.confirmationCopy(form.email)}
                                        </p>
                                        <div className="modal-actions modal-actions--stack">
                                            <button
                                                type="button"
                                                className="btn-modal-primary"
                                                onClick={handlePurchaseConfirmation}
                                                disabled={purchaseSending}
                                            >
                                                {purchaseSending ? checkout.sendingEmail : checkout.confirmButton}
                                            </button>
                                            <div className={`purchase-feedback${purchaseState.type ? ` ${purchaseState.type}` : ''}`} aria-live="polite">
                                                {purchaseState.message || ' '}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-actions modal-actions--inline">
                                        <button type="button" className="btn-modal-secondary" onClick={goBack}>
                                            {checkout.changeMethod}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer-brand">
                    <BrandLogo variant="mark" size="sm" className="modal-footer-brand__logo" />
                    <span>{checkout.sectionFooter}</span>
                </div>
            </div>
        </div>
    );
}
