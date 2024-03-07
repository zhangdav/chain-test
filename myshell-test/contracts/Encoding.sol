// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Encoding {
    function combineStrings(string memory text) public pure returns (string memory) {
        return string(abi.encodePacked(text));
    }

    function encodeNumber(uint256 favoriteNumber) public pure returns (bytes memory) {
        bytes memory number = abi.encode(favoriteNumber);
        return number;
    }

    // You'd use this to make calls to contracts
    function encodeString(string memory text) public pure returns (bytes memory) {
        bytes memory someString = abi.encode(text);
        return someString;
    }

    function encodeStringPacked(string memory text) public pure returns (bytes memory) {
        bytes memory someString = abi.encodePacked(text);
        return someString;
    }

    function encodeStringBytes(string memory text) public pure returns (bytes memory) {
        bytes memory someString = bytes(text);
        return someString;
    }

    function decodeString(string memory text) public pure returns (string memory) {
        string memory someString = abi.decode(encodeString(text), (string));
        return someString;
    }

    function multiEncode(
        string memory text,
        string memory text2
    ) public pure returns (bytes memory) {
        bytes memory someString = abi.encode(text, text2);
        return someString;
    }

    function multiDecode(
        string memory text,
        string memory text2
    ) public pure returns (string memory, string memory) {
        (string memory someString, string memory someOtherString) = abi.decode(
            multiEncode(text, text2),
            (string, string)
        );
        return (someString, someOtherString);
    }

    function multiEncodePacked(
        string memory text,
        string memory text2
    ) public pure returns (bytes memory) {
        bytes memory someString = abi.encodePacked(text, text2);
        return someString;
    }

    // This doesn't work!
    function multiDecodePacked() public pure returns (string memory) {
        string memory someString = abi.decode(multiEncodePacked(), (string));
        return someString;
    }

    // This does!
    function multiStringCastPacked() public pure returns (string memory) {
        string memory someString = string(multiEncodePacked());
        return someString;
    }

    function withdraw(address recentWinner) public {
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        require(success, "Transfer Failed");
    }
}
