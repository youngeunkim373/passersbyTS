export async function checkEmail(email: string) {
  let isEmail = true;

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (!emailRegex.test(email)) {
    isEmail = false;
  }

  return isEmail;
}
