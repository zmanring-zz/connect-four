
$(function() {

  describe("Change Player", function() {

    it("Checks for current player and changes it", function() {

        expect(CONNECTFOUR.changePlayer(0)).toEqual(1);

    });
  });

})
