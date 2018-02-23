var board = {
		name: 'Kanban Board',
		createColumn: function(column) {
		  this.element.append(column.element);
		  initSortable();
		},
		element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
			var columnName = prompt('Enter a column name');
			$.ajax({
				 url: baseUrl + '/column',
				 method: 'POST',
				 data: {
					 name: columnName
		 	 		},
				 success: function(response) {
					 var column = new Column(response.id, columnName);
					 board.createColumn(column);
				 }
	 	 });
});

function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      update: function(event) {
		// debugger;
		// console.log(event, this);

		// PUT /card/{id}
		// ------------------------------
		// Request:
		// {id}: int - id card we want to edit
		// name: string - new name card
		// bootcamp_kanban_column_id: int - the column id to which we want to move the post
		// ------------------------------
		// Response:
		// {
		//    id: int
		// }

		var $cardElement = $(event.toElement).closest('.card');

		var cardId = $cardElement.data('id');
		// console.log('cardId', cardId);

		var cardName = $cardElement.data('name');
		// console.log('cardName', cardName);

		var columnId = $(event.toElement).closest('.column').data('id');
		// console.log('columnId', columnId);

		$.ajax({
			url: baseUrl + '/card/' + cardId,
			method: 'PUT',
			data: {
				id: cardId,
				name: cardName,
				bootcamp_kanban_column_id: columnId
			},
			success: function(response) {
	  			//self.element.remove();
			}
		});
	  }
    }).disableSelection();
  }
