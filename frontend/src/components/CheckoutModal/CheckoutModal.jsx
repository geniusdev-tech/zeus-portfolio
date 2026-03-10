import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './CheckoutModal.css';

const STEPS = ['IDENTIFICATION', 'METHOD_SELECTION', 'PAYMENT'];

export default function CheckoutModal({ isOpen, onClose, productName, price }) {
    const [step, setStep] = useState('IDENTIFICATION');
    const [paymentMethod, setPaymentMethod] = useState('PIX');
    const [form, setForm] = useState({ name: '', email: '' });
    const [timeLeft, setTimeLeft] = useState(600);
    const [copied, setCopied] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setStep('IDENTIFICATION');
            setPaymentMethod('PIX');
            setTimeLeft(600);
            setCopied('');
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
        setStep('PAYMENT');
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
        ? 'The system will confirm PIX payment after transfer.'
        : 'After sending USDT, forward the transaction hash to suporte@zeus.dev.';

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
                        <span className="modal-tag">Secure Checkout</span>
                        <h2 className="modal-title">{productName}</h2>
                        <p className="modal-subtitle">
                            Operator license checkout with PIX and USDT payment support.
                        </p>
                    </div>
                    <div className="modal-pricebox">
                        <span className="modal-pricebox__label">Current price</span>
                        <div className="modal-price">R$ {price}</div>
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
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Joao Silva"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    autoFocus
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
                                />
                            </div>
                            <button type="submit" className="btn-modal-primary">
                                Continue to Payment Method →
                            </button>
                        </form>
                    ) : step === 'METHOD_SELECTION' ? (
                        <div className="method-selection">
                            <p className="selection-label">Select the payment method</p>
                            <div className="method-cards">
                                <button type="button" className="method-card" onClick={() => handleSelectMethod('PIX')}>
                                    <div className="method-icon">PIX</div>
                                    <div className="method-info">
                                        <span className="method-name">Pix</span>
                                        <span className="method-desc">Instant payment with automatic confirmation flow.</span>
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
                        </div>
                    ) : (
                        <div className="payment-step">
                            <div className="payment-status">
                                <span className="status-dot blink" />
                                {paymentMethod === 'PIX' ? 'Awaiting PIX payment' : 'Awaiting wallet transfer'}
                            </div>
                            <div className="payment-timer">
                                Payment window <span className="highlight">{formatTime(timeLeft)}</span>
                            </div>

                            <div className="payment-grid">
                                <div className="qr-code-panel">
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
                                    </div>

                                    <div className="payment-detail payment-detail--note">
                                        <span className="small-label">Instructions</span>
                                        <p className="payment-note">{paymentHint}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer-brand">
                    <span className="modal-footer-brand__dot" />
                    Secure checkout surface with encrypted transfer workflow
                </div>
            </div>
        </div>
    );
}
