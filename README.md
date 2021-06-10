# SIMPLE CALENDAR FOR *TAILWIND*

## How it works

You need to add in a text input the data attribute "data-date-component" and as parameter you need to add the modal id *(if you have many inputs you need to set different date-component names)*


`<input data-date-component="calendar_ID" data-date-color="red" data-date-text-color="white">`


## Parameters of data attributes

Note: The colors are based in the default tailwind pallete, if you want more colors you need to extend the pallete colors in tailwind.config.js

| Name      | Description | Syntax |
| ----------- | ----------- | ----------- |
| Date Component | This is the id of the calendar modal | data-date-component="homework_date" |
| Date Color   | This is for the calendar background color and the last and next month dates | data-date-color="red" |
| Date Text Color   | This is for the title and month days text color | data-date-text-color="white" |

## How to run the project

You must have nodejs V12.18.4 or last

*To run on development*

`npm run dev`

*To build for production*

`npm run build`