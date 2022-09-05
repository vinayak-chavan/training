jQuery("#sign-in").validate({
    rules:{
        emailID:{
            required:true,
            email:true
        },
        password:{
            required:true,
            minlength:5
        },
    },
    messages:{
        emailID:{
           required:"Please enter email",
           email:"Please enter valid email"
        },
        password:{
            required:"Please enter password",
            minlength:"Password must be contains 5 char"
        }
    },
    submitHandler:function(form){
        form.submit();
    }
});

jQuery("#sign-up").validate({
    rules:{
        username:"required",
        emailID:{
            required:true,
            email:true
        },
        password:{
            required:true,
            minlength:5
        },
    },
    messages:{
        username:"Please enter username",
        emailID:{
            required:"Please enter email",
            email:"Please enter valid email"
         },
        password:{
            required:"Please enter password",
            minlength:"Password must be contains 5 char"
        }
    },
    submitHandler:function(form){
        form.submit();
    }
});

jQuery("#addblog").validate({
    rules:{
        title:"required",
        description:{
            required:true,
            maxlength:100
        },
        photo:"required"
    },
    messages:{
        title:"Please enter title",
        description:{
            required:"Please enter description",
            maxlength:"Description is too long"
        },
        photo:"Please select image"
    },
    submitHandler:function(form){
        form.submit();
    }
});