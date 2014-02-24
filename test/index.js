var run = require("../");

it('runs given commands serially', function(done){
  run(['cat test/foo', 'node test/err.js', 'cat test/bar'], function (error, stdouts, stderrs) {
    expect(error).to.not.exist;

    expect(stdouts[0]).to.equal('this is foo\nand this is second line\n');
    expect(stdouts[1]).to.equal('');
    expect(stdouts[2]).to.equal('this is bar\nand second line at bar\nbye\n:)\n');
    expect(stderrs[1]).to.equal('I just exit with error');
    done();
  });
});

it('stops on fail', function(done){
  run(['cat test/foo', 'node test/err.js', 'node notexisting.js', 'cat test/bar'], function (error, stdouts, stderrs) {
    expect(error).to.exist;

    expect(stdouts[0]).to.equal('this is foo\nand this is second line\n');
    expect(stdouts[1]).to.equal('');
    expect(stdouts[2]).to.not.exist;
    expect(stdouts[3]).to.not.exist;

    expect(stderrs[1]).to.equal('I just exit with error');
    done();
  });
});
