# hbs2html
Generates static HTML from Handlebar templates

## Usage 
`$ node hbs2html -p <partialsDir> -o <outputDir> <src>`

## Example
This would be converting all Handlebar templates in a `src` directory, registering partials from the `src/partials` dir. 
The outputted html files would end up in a directory called `dist`.

`$ node hbs2html -p src/partials -o dist src/*.hbs`