toastr.options = {
    closeButton: false,
    debug: false,
    positionClass:'toast-top-right',
    onclick: null
};

var Toast = {
    success:function(title){
        toastr["success"](title, "");
    },
    info:function(title){
        toastr["info"](title, "");
    },
    warning:function(title){
        toastr["warning"](title, "");
    },
    error:function(title){
        toastr["error"](title, "");
    },

}


