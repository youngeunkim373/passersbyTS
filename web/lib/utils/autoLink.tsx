export function autoLink(emailOrUrl: string) {
  var regURL = new RegExp(
    "(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377@()]+)",
    "gi"
  );
  var regEmail = new RegExp(
    "([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)",
    "gi"
  );

  emailOrUrl = emailOrUrl
    .replace(
      regURL,
      `<a href="$1://$2" target="_blank" style="color:blue"}> 
              $1://$2
         </a>`
    )
    .replace(regEmail, "<a href='mailto:$1'style='color:blue'>$1</a>");

  return <p dangerouslySetInnerHTML={{ __html: emailOrUrl }}></p>;
}
