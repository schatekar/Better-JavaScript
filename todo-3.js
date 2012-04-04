$(document).ready(function () {
	var addTodoButton = $('input[type="submit"].add-todo');
	var todoTextbox = $('input[type="text"].add-todo');
	
    $(addTodoButton).click(function () {
        var todo = $(todoTextbox).val();

        if (todo) {

            $('.todo-list').append(HtmlFor(todo));
            $(todoTextbox).val(null);
        }
    });
	
	function HtmlFor(todo) {
        return '<li><span class="todo">' + todo + '</span><a class="edit">Edit</a><a class="remove">Remove</a></li>';
    }

    $('a.edit').live('click', function () {

        $(this).siblings('.remove').remove();
        var todoSpan = $(this).siblings('span');
        var todo = $(todoSpan).text();
        var edittodo = '<input class="editing" type="text" data-original-value="' + todo + '" value="' + todo + '" />';
        todoSpan.replaceWith(edittodo);

        var actions = '<a class="save">Save</a><a class="cancel">Cancel</a>';
        $(this).replaceWith(actions);
    });

    $('a.save').live('click', function () {

        var todo = $(this).parent().children('.editing').val();

        if (todo !== null) {
            $(this).parent().replaceWith(getToDoHtml(todo));
        }
    });

    $('a.cancel').live('click', function () {
        var todo = $(this).parent().children('.editing').attr('data-original-value');

        if (todo !== null) {
            $(this).parent().replaceWith(htmlFor(todo));
        }
    });

    $('a.remove').live('click', function () {

        var confirmremove = confirm("Are you sure you want to remove this todo item?");

        if (confirmremove) {
            $(this).parent().remove();
        }

    });
});