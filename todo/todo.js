$(document).ready(function () {
    var container = $('<div>').addClass('todo-container');
    $('body').append(container);
    
    var heading = $(`<h1>`).text('To-Do List');
    container.append(heading)
    
    var inputField = $(`<input>`).attr('type', 'text').attr('placeholder', 'Add a new Task');
    container.append(inputField);

    var addButton = $(`<button>`).text('Add');
    container.append(addButton);

    var taskList = $(`<ul>`);
    container.append(taskList)

    addButton.click(function() {
        const taskText = inputField.val();
        if (taskText.trim() !== '') {
            const listItem = $(`<li>`).text(taskText)
            const deleteButton = $(`<button>`).text("X")
            const completedButton = $(`<button>`).text("completed")
            listItem.append(deleteButton)
            listItem.append(completedButton)
            taskList.append(listItem);
            inputField.val('')
            deleteButton.click(function () {
               listItem.remove()
            })
            completedButton.click(function () {
                listItem.toggleClass('completed')
            })
        }
    })


})