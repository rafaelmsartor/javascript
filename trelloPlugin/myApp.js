<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="https://api.trello.com/1/client.js?key=550d5d3a9db3d1a6be2ed137ce0cc766"></script>

var authenticationSuccess = function() { console.log( 'Authentication Successful!' ); };
var authenticationFailure = function() { console.log( 'Authentication failed!' ); };

Trello.authorize( {
    type: 'popup',
    name: 'Getting started application',
    scope: {
        read: 'true',
        write: 'true'
    },
    expiration: 'never',
    success: authenticationSuccess,
    failure: authenticationFailure
});

var MainBoardName = 'teste';  // name of the destination board
var MainBoard = null;

var MainBoardLists = [];

var MyBoards;

var success = function( successMsg ) {
    asyncOutput( successMsg );
}

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

var childListsSuccess = function( successMsg )
{
    var myList = null;

    for( var listIndex = 0; listIndex < MainBoardLists.length; listIndex++ )
    {
        if( successMsg[0].idBoard == MainBoardLists[listIndex].boardId )
        {
            myList = MainBoardLists[listIndex];
            break;
        }
    }
    
    if( myList == null )
    {
        return;
    }

    for( var dataIndex = 0; dataIndex < successMsg.length; dataIndex++ )
    {
        var myCard = {
            name: successMsg[dataIndex].name,
            idList: myList.listId
        };
        Trello.post( '/cards/', myCard, success, error );
    }
}

var mainListsSuccess = function( successMsg )
{
    for( var dataIndex = 0; dataIndex < successMsg.length; dataIndex++ )
    {
        var list = {
            name: successMsg[dataIndex].name,
            listId:   successMsg[dataIndex].id
        };
        MainBoardLists.push( list );
    }
    
    for( var listIndex = 0; listIndex < MainBoardLists.length; listIndex++ )
    {
        for( var boardIndex = 0; boardIndex < MyBoards.length; boardIndex++ )
        {
            if( MainBoardLists[listIndex].name == MyBoards[boardIndex].name )
            {
                MainBoardLists[listIndex].boardId = MyBoards[boardIndex].id;
                Trello.get( '/boards/' + MyBoards[boardIndex].id + '/lists/', childListsSuccess, error );
            }
        }
    }
}

var boardSuccess = function(successMsg) {

    for( var dataIndex = 0; dataIndex < successMsg.length; dataIndex++ )
    {
        var boardName = successMsg[dataIndex].name;
        if( boardName == MainBoardName )
            MainBoard = successMsg[dataIndex];
    }

    if( MainBoard != null )
    {
        MyBoards = successMsg;
        Trello.get( '/boards/' + MainBoard.id + '/lists/', mainListsSuccess, error );
    }
};


Trello.get('/member/me/boards', boardSuccess, error);