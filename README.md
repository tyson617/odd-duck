# odd-duck

## Needs

### Constructor

- Object
  - Name of the product
  - File path of image
  - Times the image has been shown
    - Define property to track selections made

### Executable Code

#### Notes

- Algorithm to randomly generate 3 product images
  - Display images side-by-side
  - For each image, increment times shown by one
- Event Listener to HTML page
  - Click
    - Generate 3 new products to pick from
- Button: `View Results`
  - Event Listener
    - To start after voting is done
    - Remove previous event listener
  - Display total clicks results in a table
    - i.e. `banana had 3 votes, and was seen 5 times.`
- Control voting duration
  - Minimum 25 rounds before ending voting session
    - Keep number of rounds in variable for ease of debugging/testing
