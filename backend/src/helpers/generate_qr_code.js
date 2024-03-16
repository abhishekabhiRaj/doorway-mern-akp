import QRCode from "qrcode";

export const generate_qr_code = async (text, qrcode) => {
    var qr;
    // qr = QRCode.toString(text, function (err, string) {
    //     if (err) throw err
    //     return string;
    // });
    try {
        qr = await QRCode.toDataURL(text);
      } catch (err) {
        console.error(err)
      }
    
    //   console.log("2222", qr);
    qrcode = qr;
    return qr;
}