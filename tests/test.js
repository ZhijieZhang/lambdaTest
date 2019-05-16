describe('Test', function() {
  it('test', function(client) {
    client
      .resizeWindow(1280, 960)
      .url(`http://localhost.lambdatest.com:3000/samples/full-apis/AddImageTest`)
      .execute(function() {
        window.saveBuffer = function (buffer, filename, mimeType) {
          (window.buffers = window.buffers || []).push({ buffer, mimeType });
        };
      })
      .pause(35000)
      .execute(
        function() {
          return window.buffers;
        },
        
        [], 
        
        function(result) {
          const buffers = result.value;

          client.execute(function(buffers) {
            
          }, [buffers]);
        }
      )
      .end();
  });
});