import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

type CaptchaProps = {
  onChange: () => void;
};
const Captcha = ({ onChange }: CaptchaProps) => {
  const key = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  return (
    <div>
      <ReCAPTCHA sitekey={key} onChange={onChange} />
    </div>
  );
};

export default Captcha;
