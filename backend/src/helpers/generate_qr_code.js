import QRCode from "qrcode";

export const generate_qr_code = (text) => {
    let qr;
    qr = QRCode.toString(text, function (err, string) {
        if (err) throw err
        return string;
    });
    return qr;
}