function TestScore(name, kor, eng){
    this.userName = name;
    this.korNum = kor;
    this.engNum = eng;
}
TestScore.prototype.getTestInfo = function() {
    document.write("이름: " + this.userName, "<br>");
    document.write("국어: " + this.korNum, "<br>");
    document.write("영어: " + this.engNum, "<br>");
}
TestScore.prototype.getAvg = function() {
    return  (this.korNum + this.engNum) / 2;
}
