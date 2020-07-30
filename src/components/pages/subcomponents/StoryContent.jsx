import React from 'react';

class StoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContentVisible: false,
    };
    this.mainContentRef = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('scroll', this.showAndHideContent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showAndHideContent);
  }

  showAndHideContent = () => {
    const el = this.mainContentRef.current.getBoundingClientRect();
    if (el.top < 260) {
      this.setState({
        isContentVisible: true,
      });
    }
  };

  render() {
    return (
      <section
        className={this.state.isContentVisible ? 'show' : 'hide'}
        ref={this.mainContentRef}
        id="main"
      >
        <div>
          <p>
            <span>Our Company</span> ipsum dolor sit amet consectetur,
            adipisicing elit. Reiciendis, nobis voluptatem at omnis vero cumque
            temporibus esse architecto mollitia nam perspiciatis atque laborum.
            Rem id possimus illum assumenda deserunt nostrum aperiam
            dignissimos. Iure, soluta? Repellat, veniam neque dolor nesciunt
            aliquid unde perferendis corporis fuga, mollitia nulla harum eveniet
            quisquam voluptas!
          </p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            illum tempore iusto perferendis molestiae sunt sapiente labore
            suscipit, tempora vero repudiandae cupiditate veniam magnam
            laudantium ea reiciendis cumque minima fuga consequatur. Cupiditate,
            laudantium dignissimos harum accusantium deleniti quisquam odio
            reprehenderit.
          </p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            quisquam nisi neque beatae necessitatibus fugit. At recusandae
            accusamus cum deserunt?
          </p>
          <div className="author">
            <em>
              -<span>Louis Martin</span> Chief Technology Officer
            </em>
          </div>
        </div>
      </section>
    );
  }
}

export default StoryContent;
