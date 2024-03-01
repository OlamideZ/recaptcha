const {RecaptchaEnterpriseServiceClient} =
require('@google-cloud/recaptcha-enterprise');

async function createAssessment({
    projectID ,
    recaptchaSiteKey ,
    token ,
    recaptchaAction,
    }) {
        debugger
        console.log(projectID, recaptchaAction, recaptchaSiteKey, token)
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    const request = ({
            assessment: {
            event: {
                token: token,
                siteKey: recaptchaSiteKey,
            },
        },
        parent: projectPath,
    });

    // client.createAssessment() can return a Promise or take a Callback
    const [ response ] = await client.createAssessment(request).catch((err) => {
        console.log(err)
    });

    // Check if the token is valid.
    if (!response.tokenProperties.valid) {
    console.log("The CreateAssessment call failed because the token was: " +
    response.tokenProperties.invalidReason);

    return null;
    }

    // Check if the expected action was executed.
    // The `action` property is set by user client in the
    // grecaptcha.enterprise.execute() method.
    if (response.tokenProperties.action === recaptchaAction) {

    console.log("The reCAPTCHA score is: " +
    response.riskAnalysis.score);

    response.riskAnalysis.reasons.forEach((reason) => {
    console.log(reason);
    });
    return response.riskAnalysis.score;
    } else {
    console.log("The action attribute in your reCAPTCHA tag " +
    "does not match the action you are expecting to score");
    return null;
    }
}
module.exports = createAssessment