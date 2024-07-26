let generatedOTP;
let intervalId;

const otpExpireElem = document.getElementById('otp-expires-id');

const totalTime = 15000;
const interval = 1000;

function expireOTP(){
    
    let slice = totalTime / interval;

    intervalId = setInterval(function () {
        otpExpireElem.innerText = `OTP will expire in ${slice} seconds`;
        slice = slice - 1;
    }, interval);

    setTimeout(function () {
        otpExpireElem.innerText = `OTP Expired`
        clearInterval(intervalId);
        generateOTP();
    }, totalTime)
}

function tackleOTPBoxes() {
    const boxes = document.getElementById("otp-box-list-id");
    boxes.addEventListener('input', function(e) {
        const target = e.target;
        const value = target.value;

        if(isNaN(value)){
            target.value = "";
            return;
        };

        const nextElement = target.nextElementSibling;

        if(nextElement){
            nextElement.focus();
        }

        validateOTP();
    })
};

function generateOTP(){
    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    const otpElem = document.getElementById('generate-otp-id');

    otpElem.innerText = `Your OTP: ${generatedOTP}`;
    expireOTP();
};

function validateOTP(){
    let typedNumber = "";
    const boxListElem = document.getElementById('otp-box-list-id');
    [...boxListElem.children].forEach((elem) => {
        elem.value;
        typedNumber = typedNumber + elem.value;
    });

    const result = (generatedOTP === parseInt(typedNumber, 10));
    const resultElem = document.getElementById('result-id');

    if(result){
        resultElem.innerText = "OTP has been validate successfully";
        resultElem.classList.remove('fail');
        resultElem.classList.add("success");
        clearInterval(intervalId);
        setTimeout(generateOTP, 2000);
    } else{
        resultElem.innerText = "OTP is Invalidate";
        resultElem.classList.remove('success');
        resultElem.classList.add("fail");
    }
};

function init(){
    tackleOTPBoxes();
    setTimeout(generateOTP, 2000);
};

init();