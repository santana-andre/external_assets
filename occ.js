//$("body").append("<script src='http://127.0.0.1:8887/external_assets/occ.js' cliente='oi'></script>")

//Lista de Clientes
var json = {
    oi: {
        logo: "https://s2.glbimg.com/KkAhF9jrHGK9qan2sf8LuiQ-nME=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2020/v/i/glx2xMRgW5kBTOK7OBdg/logooi140x140.png",
        cor: "green",
        produtos: [
            {
                imagem: "https://www.rivershop.com.br/file/general/logo_login.png",
                nome: "prd1"
            },
            {
                imagem: "https://www.rivershop.com.br/file/general/logo_login.png",
                nome: "prd2"
            }
        ]
    },
    rv: {
        logo: "https://www.rivershop.com.br/file/general/logo_login.png",
        cor: "red",
        produtos: [
            {
                imagem: "https://www.rivershop.com.br/file/general/logo_login.png",
                nome: "prd1"
            },
            {
                imagem: "https://www.rivershop.com.br/file/general/logo_login.png",
                nome: "prd2"
            }
        ]
    }
}

function getSyncScriptParams() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var scriptName = lastScript;
    return scriptName.getAttribute('cliente');
}
//Get Cliente Param
var cliente = getSyncScriptParams()
//Vars
var logo = json[cliente].logo
var customcss = "<style> p, a, span{font-family: arial !important; color: " + json[cliente].cor + " !important;} </style>"
//View
json[cliente].produtos.forEach(function logArrayElements(element, index, array) {
    $('img[alt="Produto_'+index+'"]').attr("srcset", element.imagem)
    $('img[alt="Laurindo"]').attr("srcset", element.imagem)
    
});

function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}



$(".logo img").attr("src", logo).css({ "height": "80px", "width": "auto" })

$("body").append(customcss)





