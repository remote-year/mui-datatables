import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
  },
});

class TableSearch extends React.Component {
  handleTextChange = event => {
    const { onSearchChange } = this.props.options;

    if (onSearchChange) {
      onSearchChange(event.target.value);
    }

    this.props.onSearch(event.target.value);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  };

  render() {
    const { classes, options, onHide, searchText } = this.props;

    return (
      <div className={classes.main} ref={el => (this.rootRef = el)}>
        <TextField
          className={classes.searchText}
          InputProps={{
            'aria-label': options.textLabels.toolbar.search,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
            <InputAdornment position="end">
              {searchText && <IconButton onClick={this.props.clearSearch}>
                <CloseIcon />
              </IconButton>}
              </InputAdornment>
            ),
          }}
          value={searchText || ''}
          onChange={this.handleTextChange}
          fullWidth={true}
          inputRef={el => (this.searchField = el)}
        />
      </div>
    );
  }
}

export default withStyles(defaultSearchStyles, { name: 'MUIDataTableSearch' })(TableSearch);
