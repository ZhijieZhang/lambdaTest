describe('Test', function() {
  it('test', function(client) {
    client
      .resizeWindow(1280, 960)
      .url(`http://localhost.lambdatest.com:3000/samples/full-apis/AddImageTest`)
      .execute(function() {
        // override the saveBuffer function to save the buffer it receives to a buffers array
        // the "full-apis/AddImageTest" sample will call the saveBuffer function with the buffer and the mimeType 
        // after it finishes processing the document 
        window.saveBuffer = function(buffer, filename, mimeType) {
          (window.buffers = window.buffers || []).push({ buffer, mimeType });
        };
      })
      // we have a better way to detect if the buffer has been saved to the window.buffers array in our test suite
      // for the sake of simplicity I will just instead wait for 35 seconds here
      .pause(35000)
      .execute(
        // get the buffers array in the browser context and return it so that I can have a reference to it in my node environment
        function() {
          return window.buffers;
        },
        
        [], 
        
        function(result) {
          const buffers = result.value;

          // the "Error while running .executeScript() protocol action: An unknown error has occurred." error 
          // happens here if I pass the buffers array back to the browser context
          // the element in the buffers array is an object in the shape of:
          // {
          //   buffer: an array that has ~45000 elements
          //   mimeType: a short string
          // }
          // what I found is that if I just pass a small number to the browser context, no error is thrown and everything seems to be fine
          // does the error occur because the buffer is too big(an array that has ~45000 elements in it)?
          // however the same test runs fine using browserstack under the same test_settings. 
          client.execute(function(buffers) {
            
          }, [buffers]);
        }
      )
      .end();
  });
});