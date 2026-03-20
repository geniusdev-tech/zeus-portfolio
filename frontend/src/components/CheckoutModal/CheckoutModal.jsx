import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { contactLinks } from '../../data';
import BrandLogo from '../BrandLogo/BrandLogo';
import './CheckoutModal.css';

const STEPS = ['IDENTIFICATION', 'METHOD_SELECTION', 'PAYMENT'];
const cleanUrl = (url) => {
    if (!url) return 'http://localhost:8080';
    const match = url.match(/https?:\/\/[^/\s]+/);
    return match ? match[0] : url;
};

const API_URL = cleanUrl(import.meta.env.VITE_API_URL);
const supportEmail = contactLinks.find((link) => link.label === 'Email')?.value || 'walletzeus@proton.me';

export default function CheckoutModal({ isOpen, onClose, productName, price }) {
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
    const paymentLabel = paymentMethod === 'PIX' ? 'PIX Copy and Paste' : 'USDT Polygon Address';
    const paymentHint = paymentMethod === 'PIX'
        ? 'PIX confirmation is handled automatically after transfer.'
        : `After sending USDT, forward the transaction hash to ${supportEmail}.`;
    const paymentMethodLabel = paymentMethod === 'PIX' ? 'Pix instant transfer' : 'USDT on Polygon';

    const shortValue = !paymentValue
        ? 'Configuration pending'
        : paymentMethod === 'PIX'
            ? `${paymentValue.substring(0, 30)}...`
            : paymentValue;

    const handleCopy = async (text) => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(paymentMethod === 'PIX' ? 'PIX code copied' : 'Wallet address copied');
    };

    const handlePurchaseConfirmation = async () => {
        setPurchaseSending(true);
        setPurchaseState({ type: '', message: '' });

        try {
            const response = await fetch(`${API_URL}/api/qelox/purchase-confirmation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                message: 'Delivery email sent with the QELO-X access link.',
            });
        } catch (error) {
            setPurchaseState({
                type: 'error',
                message: error.message || 'Failed to send the delivery email.',
            });
        } finally {
            setPurchaseSending(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-ambient" />
                <div className="modal-grid" />

                <button className="modal-close" onClick={onClose} aria-label="Close checkout">
                    ×
                </button>

                <div className="modal-header">
                    <div className="header-left">
                        <div className="modal-brand-row">
                            <BrandLogo variant="inline" size="sm" className="modal-brand-logo" />
                            <span className="modal-brand-row__label">Checkout intake channel</span>
                        </div>
                        <span className="modal-tag">Operator Checkout</span>
                        <h2 className="modal-title">{productName}</h2>
                        <p className="modal-subtitle">
                            Guided payment flow for operator access with PIX and USDT support.
                        </p>
                        <div className="modal-header__chips" aria-label="Checkout highlights">
                            <span className="modal-chip">Access delivery by email</span>
                            <span className="modal-chip">PIX and crypto support</span>
                            <span className="modal-chip">Operator intake checkout</span>
                        </div>
                    </div>
                    <div className="modal-pricebox">
                        <span className="modal-pricebox__label">Current access</span>
                        <div className="modal-price">R$ {price}</div>
                        <span className="modal-pricebox__hint">Single release access</span>
                    </div>
                </div>

                <div className="modal-steps" aria-hidden="true">
                    {['Identification', 'Method', 'Payment'].map((label, index) => (
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
                                <span className="modal-section-tag">Step 01</span>
                                <p>Enter the delivery contact so access and payment follow-up land in the correct inbox.</p>
                            </div>
                            <div className="checkout-hintbar">
                                <span className="checkout-hintbar__item">Used for access delivery</span>
                                <span className="checkout-hintbar__item">Used for payment follow-up</span>
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Joao Silva"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    autoFocus
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Delivery Email</label>
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="btn-modal-primary">
                                    Continue to Payment Method
                                </button>
                            </div>
                        </form>
                    ) : step === 'METHOD_SELECTION' ? (
                        <div className="method-selection">
                            <div className="modal-section-intro">
                                <span className="modal-section-tag">Step 02</span>
                                <p>Select the payment rail you want to use for this order.</p>
                            </div>
                            <div className="checkout-context">
                                <div className="checkout-context__item">
                                    <span className="checkout-context__label">Buyer</span>
                                    <strong>{form.name}</strong>
                                </div>
                                <div className="checkout-context__item">
                                    <span className="checkout-context__label">Delivery</span>
                                    <strong>{form.email}</strong>
                                </div>
                            </div>
                            <p className="selection-label">Select the payment method</p>
                            <div className="method-cards">
                                <button type="button" className="method-card" onClick={() => handleSelectMethod('PIX')}>
                                    <div className="method-icon">PIX</div>
                                    <div className="method-info">
                                        <span className="method-name">Pix</span>
                                        <span className="method-desc">Instant payment with automatic confirmation.</span>
                                    </div>
                                    <div className="method-arrow">→</div>
                                </button>
                                <button type="button" className="method-card" onClick={() => handleSelectMethod('CRYPTO')}>
                                    <div className="method-icon">USDT</div>
                                    <div className="method-info">
                                        <span className="method-name">USDT (Polygon)</span>
                                        <span className="method-desc">Crypto payment for operators who prefer on-chain transfer.</span>
                                    </div>
                                    <div className="method-arrow">→</div>
                                </button>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-modal-secondary" onClick={goBack}>
                                    Back
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="payment-step">
                            <div className="modal-section-intro">
                                <span className="modal-section-tag">Step 03</span>
                                <p>Use the QR code or copy field below to complete payment and keep the order active within the time window.</p>
                            </div>

                            <div className="payment-topbar">
                                <div className="payment-status">
                                    <span className="status-dot blink" />
                                    {paymentMethod === 'PIX' ? 'Awaiting PIX payment' : 'Awaiting wallet transfer'}
                                </div>
                                <div className="payment-timer">
                                    Payment window <span className="highlight">{formatTime(timeLeft)}</span>
                                </div>
                            </div>

                            <div className="payment-method-banner">
                                <span className="payment-method-banner__label">Selected rail</span>
                                <strong>{paymentMethodLabel}</strong>
                            </div>

                            <div className="payment-grid">
                                <div className="qr-code-panel">
                                    <div className="qr-code-meta">
                                        <span>{paymentMethod === 'PIX' ? 'Scan to pay' : 'Scan to open wallet'}</span>
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
                                                <div className="qr-error">Configuration pending</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <div className="payment-detail payment-detail--summary">
                                        <span className="small-label">Access summary</span>
                                        <div className="checkout-context checkout-context--compact">
                                            <div className="checkout-context__item">
                                                <span className="checkout-context__label">Product</span>
                                                <strong>{productName}</strong>
                                            </div>
                                            <div className="checkout-context__item">
                                                <span className="checkout-context__label">Buyer</span>
                                                <strong>{form.name}</strong>
                                            </div>
                                            <div className="checkout-context__item">
                                                <span className="checkout-context__label">Delivery</span>
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
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <div className={`copy-feedback${copied ? ' visible' : ''}`}>
                                            {copied || ' '}
                                        </div>
                                        <p className="copy-support">
                                            {paymentMethod === 'PIX'
                                                ? 'If scanning fails, use the copy-and-paste field.'
                                                : 'If your wallet does not scan QR codes, copy the address directly.'}
                                        </p>
                                    </div>

                                    <div className="payment-detail payment-detail--note">
                                        <span className="small-label">Instructions</span>
                                        <p className="payment-note">{paymentHint}</p>
                                    </div>
                                    <div className="payment-detail payment-detail--confirmation">
                                        <span className="small-label">Finalize delivery email</span>
                                        <p className="payment-note">
                                            After completing the transfer, confirm below to send the delivery email with the QELO-X access link to {form.email}.
                                        </p>
                                        <div className="modal-actions modal-actions--stack">
                                            <button
                                                type="button"
                                                className="btn-modal-primary"
                                                onClick={handlePurchaseConfirmation}
                                                disabled={purchaseSending}
                                            >
                                                {purchaseSending ? 'Sending delivery email...' : 'I completed payment'}
                                            </button>
                                            <div className={`purchase-feedback${purchaseState.type ? ` ${purchaseState.type}` : ''}`} aria-live="polite">
                                                {purchaseState.message || ' '}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-actions modal-actions--inline">
                                        <button type="button" className="btn-modal-secondary" onClick={goBack}>
                                            Change Method
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer-brand">
                    <BrandLogo variant="mark" size="sm" className="modal-footer-brand__logo" />
                    <span>Secure checkout surface for operator access workflow</span>
                </div>
            </div>
        </div>
    );
}
