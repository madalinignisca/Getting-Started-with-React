function logout() {
    FB.logout();
}

function loadUserAndLikes() {
    var fields = { fields: 'name,link' };
    FB.api('/me', fields, function(userResponse) {
        React.render(<UserDetails userDetails={userResponse} />, document.getElementById('user'));

        var fields = { fields: 'category,name,link,picture.type(normal)' };
        FB.api('/me/likes', fields, function(likesResponse) {
            React.render(<UserLikesList list={likesResponse.data} />, document.getElementById('main'));
        });
    });
}

function loginAndLoadUserAndLikes() {
    FB.login(function(response) {
        loadUserAndLikes();
    });
}

function checkLoginStatusAndLoadUserLikes() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            loadUserAndLikes();
        } else {
            loginAndLoadUserAndLikes();
        }
    });
}

var UserDetails = React.createClass({
    handleLogout: function () {
        FB.logout(function () {
            alert("You're logged out, refresh the page in order to login again.");
        });
    },
    render: function () {
        return (
            <section id="user-details">
                <a href={this.props.userDetails.link} target="_blank">
                    {this.props.userDetails.name}
                </a>
                {' | '}
                <a href="#" onClick={this.handleLogout}>Logout</a>
            </section>
        );
    }
});

var UserLikesList = React.createClass({
    render: function () {
        var items = this.props.list.map(function (likeObject) {
            return <UserLikeItem data={likeObject} />
        });

        return (
            <ul id="user-likes-list">
                {items}
            </ul>
        );
    }
});

var UserLikeItem = React.createClass({
    render: function () {
        var data = this.props.data;

        return (
            <li>
                <a href={data.link}>
                    <img src={data.picture.data.url} alt={data.name} />
                    <h4>{data.name} <small>{data.category}</small></h4>
                </a>
            </li>
        );
    }
});
