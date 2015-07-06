## Node-Boilerplate

#### A Node.js Boilerplate that does not rely on frameworks

__To Use:__ Open a terminal and type  


        git clone git@github.com:BrianDGLS/nodeBoilerplate.git
        cd nodeBoilerplate
        node serve


Notice this boilerplate does not require a 'npm install' step.  
This is because it does not require any external packages. This allows a brilliant _lean_  base for your next node project.  

#### Features:

* Top level structure  
* Static file server  
* Routing  
* Templating using curly braces  


##### Structure

The goal of this boilerplate is to be as simple as possible. You can best see this in how the structure has been laid out.  

The main _app.js_ is contained in the _backend_ folder. In a usual node project this file would need to be at the top level. In order to get around this we pass the '__dirname' parameter via the _serve.js_ file. Which means we can then seperate our front and backend files into two seperate folders, (_frontend_, _backend_).  


The frontend folder is self explanatory and should be used just like any static project. The _views_ folder is contains each page of your project as well as a seperate folder for adding in layout files.  


##### File Server

The static file server is set up to use the file types specified in the _mime-types.js_ file. In order to add a new file type just use the JSON format which is already in place.  


##### Routing

In order to add you new route you will have to create a new function in the _router.js_ file.  

Below is an example of how this function should look.  

There are three key points:

1. Define the request.url eg:  

        request.url === '/myUrl'
2. Add the values that need passed to the page via the templating engine:  

        var values = {
            title: 'Home',
            headline: 'Node.js Boilerplate'
        };
3. Define the page layout:  

        renderer.view('layout/header.html', values, response);
        renderer.view('homePage.html', values, response);
        renderer.view('layout/footer.html', {}, response);

Full example:  

        //Handle HTTP route GET '/' and POST '/'
        function home(request, response) {
            if (request.url === '/') {
                if (request.method.toLowerCase() === 'get') {
                    //The values that will be passed to our views
                    var values = {
                        title: 'Home',
                        headline: 'Node.js Boilerplate'
                    };
                    response.writeHead(200, header);
                    //Render the templates
                    renderer.view('layout/header.html', values, response);
                    renderer.view('homePage.html', values, response);
                    renderer.view('layout/footer.html', {}, response);
                    //Make sure to end the request
                    response.end();
                }
            }
        }

##### Templating

In order to use templating in the views you will use double curly braces.  

        {{ Example }}

The information should be passed to the templates via the routes _values_ variable.  


#### Quick Start

If you are using a Unix machine then placing the following in your .bashrc will allow you to quickly clone into and reuse this boilerplate.  

        newNode (){
          git clone git@github.com:BrianDGLS/nodeBoilerplate.git
          cd nodeBoilerplate
          node serve
        }

Call the above my typing _newNode_