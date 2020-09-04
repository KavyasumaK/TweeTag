import React from 'react';
import { connect } from 'react-redux';

import Classes from './TagPage.module.css';
import { initTags, categoryClicked } from '../../../Store/Actions/TagsAction';
import TagCards from '../../../components/TagCards/TagCards';
import SideDrawer from '../../../components/SideDrawer/SideDrawer';

class TagPage extends React.Component {
  componentDidMount(){
    this.props.onInitTags();
  }
  render() {
    const tempTags = [...this.props.tags];
    let tagsGotten = '';
    tagsGotten = this.props.error ? (
      <div>Tags not found</div>
    ) : (
      <div>Loading...</div>
    );
    if (this.props.tags && !this.props.error) {
      tagsGotten = (
        <>
          <div className={Classes.SideMenuContainer}>
            <SideDrawer
              tags={tempTags}
              categoryClicked={this.props.onCategoryClicked}
            ></SideDrawer>
          </div>
          <TagCards tags={tempTags} category={this.props.category}></TagCards>
        </>
      );
    }

    return <div className={Classes.TagPage}>{tagsGotten}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.TagsReducer.tags,
    category: state.TagsReducer.category,
    error: state.TagsReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitTags: () => dispatch(initTags()),
    onCategoryClicked: (category) => dispatch(categoryClicked(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagPage);
