//Require files system
var fs = require('fs');

function merge(values, content) {
    //Find where to add values in view
    for (var key in values)
        content = content.replace('{{' + key + '}}', values[key]);

    return content;
}

//Merge our values into the view
function view(templateName, values, response) {
    // Read from template
    var contents = fs.readFileSync('./frontend/views/' + templateName, {
        encoding: 'utf8'
    });

    // Insert values to content
    contents = merge(values, contents);

    // Write content
    response.write(contents);
}


//Exports
module.exports.view = view;