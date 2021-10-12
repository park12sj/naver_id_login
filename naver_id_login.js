(function () {
    const $script = document.createElement("script");
    $script.type = "text/javascript";
    $script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
  
    window.naverIdLogin = new window.EventTarget();
    window.naverIdLogin.addEventListener = function (type, callback) {
      if (type === "load" && window.naverIdLogin.loaded) callback.call(this);
      else this.__proto__.addEventListener.call(this, type, callback.bind(this));
    };
  
    $script.onload = function () {
      if (!document.getElementById("naverIdLogin")) {
        const $el = document.createElement("div");
        $el.id = "naverIdLogin";
        $el.style.display = "none";
        document.getElementsByTagName("body")[0].append($el);
      }
  
      window.naverIdLogin.init = function (clientId, callback) {
        new window.naver.LoginWithNaverId({
          clientId: clientId,
          callbackUrl: "https://park12sj.github.io/naver_id_login//naver-id-login/callback",
          isPopup: true,
          loginButton: { color: "green", type: 1, height: 0 },
        }).init();
  
        const onMessage = (evt) => {
          if (evt.origin === "https://park12sj.github.io") callback(evt.data);
        }
  
        window.addEventListener("message", onMessage);
  
        window.naverIdLogin.removeEventListener = function(type, callback) {
          if(type === "load")
            window.removeEventListener("message", onMessage)
          this.__proto__.removeEventListener.call(this, type, callback.bind(this))
        }
  
        // a href="#" 태그로 spa routing 변경되는 것 방지
        document
          .querySelector("#naverIdLogin_loginButton")
          .addEventListener("click", (evt) => {
            evt.preventDefault();
          });
      };
  
      window.naverIdLogin.trigger = function () {
        document.querySelector("#naverIdLogin_loginButton img").click();
      };
  
      window.naverIdLogin.loaded = true;
      window.naverIdLogin.dispatchEvent(new Event("load"));
    };
  
    document.getElementsByTagName("head")[0].append($script);
  })();