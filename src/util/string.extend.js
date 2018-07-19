String.prototype.matchUrl = function() {
    return this.match(/download(\S*)/)[1] || ""
}