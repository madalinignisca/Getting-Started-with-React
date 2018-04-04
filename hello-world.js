var HelloWorld = React.createClass({
  render: function () {
    // return React.createElement('h1', null, "Hello World from Learning ReactJS");
    return <h1>Hello World from Learning ReactJS</h1>;
  }
});

React.render(
  // React.createElement(HelloWorld, null),
  <HelloWorld />,
  document.getElementById('root')
);
