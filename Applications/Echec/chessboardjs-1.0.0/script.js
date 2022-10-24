var config = {
  showNotation: true,
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
}
var board = Chessboard('myBoard', config)

$('#startBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)
