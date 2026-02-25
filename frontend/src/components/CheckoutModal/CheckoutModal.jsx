import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose, productName, price }) {
    const [step, setStep] = useState('IDENTIFICATION'); // IDENTIFICATION | METHOD_SELECTION | PAYMENT
    const [paymentMethod, setPaymentMethod] = useState('PIX'); // PIX | CRYPTO
    const [form, setForm] = useState({ name: '', email: '' });
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        if (!isOpen) {
            setStep('IDENTIFICATION');
            setTimeLeft(600);
        }
    }, [isOpen]);

    useEffect(() => {
        if (step === 'PAYMENT' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    if (!isOpen) return null;

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

    // CRC16 CCITT Calculation
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
            const len = value.length.toString().padStart(2, '0');
            return `${id}${len}${value}`;
        };

        const merchantInfo =
            pad('00', 'br.gov.bcb.pix') +
            pad('01', key);

        let payload =
            pad('00', '01') + // Payload Format Indicator
            pad('26', merchantInfo) +
            pad('52', '0000') + // Merchant Category Code
            pad('53', '986') + // Currency (BRL)
            pad('54', amount.toString()) +
            pad('58', 'BR') + // Country Code
            pad('59', name.substring(0, 25)) + // Merchant Name
            pad('60', city.substring(0, 15)) + // Merchant City
            pad('62', pad('05', reference)) + // Additional Data (Reference)
            '6304'; // CRC16 Indicator

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

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copiado para o clipboard!');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div className="header-left">
                        <span className="modal-tag">// CHECKOUT</span>
                        <h2 className="modal-title">{productName}</h2>
                    </div>
                    <div className="modal-price">R$ {price}</div>
                </div>

                <div className="modal-body">
                    {step === 'IDENTIFICATION' ? (
                        <form className="checkout-form" onSubmit={handleNext}>
                            <div className="form-group">
                                <label>NOME COMPLETO</label>
                                <input
                                    type="text"
                                    placeholder="Ex: João Silva"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>E-MAIL PARA RECEBIMENTO</label>
                                <input
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-modal-primary">
                                PRÓXIMO PASSO →
                            </button>
                        </form>
                    ) : step === 'METHOD_SELECTION' ? (
                        <div className="method-selection">
                            <p className="selection-label">ESCOLHA A FORMA DE PAGAMENTO</p>
                            <div className="method-cards">
                                <div className="method-card" onClick={() => handleSelectMethod('PIX')}>
                                    <div className="method-icon">🏦</div>
                                    <div className="method-info">
                                        <span className="method-name">Pix</span>
                                        <span className="method-desc">Instantâneo e Automático</span>
                                    </div>
                                    <div className="method-arrow">→</div>
                                </div>
                                <div className="method-card" onClick={() => handleSelectMethod('CRYPTO')}>
                                    <div className="method-icon">💎</div>
                                    <div className="method-info">
                                        <span className="method-name">USDT (Polygon)</span>
                                        <span className="method-desc">No-KYC / Pagamento Anônimo</span>
                                    </div>
                                    <div className="method-arrow">→</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="payment-step">
                            <div className="payment-status">
                                <span className="status-dot blink" />
                                {paymentMethod === 'PIX' ? 'AGUARDANDO PIX...' : 'AGUARDANDO TRANSFERÊNCIA...'}
                            </div>
                            <div className="payment-timer">Expira em <span className="highlight">{formatTime(timeLeft)}</span></div>

                            <div className="qr-code-wrapper">
                                <div className="qr-code-container">
                                    {pixKey || usdtAddress ? (
                                        <QRCodeSVG
                                            value={paymentMethod === 'PIX' ? pixPayload : usdtAddress}
                                            size={220}
                                            level="H"
                                            includeMargin={true}
                                        />
                                    ) : (
                                        <div className="qr-error">Configuração Pendente</div>
                                    )}
                                </div>
                            </div>

                            <div className="pix-copy-section">
                                <p className="small-label">
                                    {paymentMethod === 'PIX' ? 'COPIA E COLA PIX' : 'ENDEREÇO USDT (POLYGON)'}
                                </p>
                                <div className="copy-box">
                                    <input readOnly value={paymentMethod === 'PIX' ? (pixPayload ? pixPayload.substring(0, 20) + "..." : "Erro") : (usdtAddress || "Erro")} />
                                    <button
                                        onClick={() => handleCopy(paymentMethod === 'PIX' ? pixPayload : usdtAddress)}
                                        disabled={paymentMethod === 'PIX' ? !pixPayload : !usdtAddress}
                                    >
                                        COPIAR
                                    </button>
                                </div>
                            </div>

                            <div className="payment-footer">
                                <span className="footer-loading">
                                    {paymentMethod === 'PIX'
                                        ? 'O sistema está verificando seu pagamento em tempo real...'
                                        : 'Após enviar o USDT, envie o comprovante para suporte@zeus.dev'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                🔒 Checkout seguro e criptografado
            </div>
        </div>
    );
}
