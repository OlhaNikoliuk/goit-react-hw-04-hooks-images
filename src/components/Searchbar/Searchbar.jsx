import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  SearchFormBtn,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = (e) =>
    setSearchQuery(e.currentTarget.value.toLowerCase());

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      //сюда можно добавить нормальную нотификашку
      alert('Enter search image');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormBtn type='submit'>
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormBtn>

        <SearchFormInput
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          onChange={onInputChange}
          value={searchQuery}
        />
      </SearchForm>
    </SearchBar>
  );
}

export default Searchbar;

// const INITIAL_STATE = {
//   searchQuery: "",
// };

// class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     ...INITIAL_STATE,
//   };

//   onInputChange = (e) => {
//     this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
//   };

//   onFormSubmit = (e) => {
//     e.preventDefault();
//     const { searchQuery } = this.state;

//     if (searchQuery.trim() === "") {
//       //сюда можно добавить нормальную нотификашку
//       alert("Enter search image");
//       return;
//     }
//     this.props.onSubmit(searchQuery);
//     this.formReset()

//   };

//   formReset = () => {
//     this.setState({ ...INITIAL_STATE });
//   };

//   render() {
//     const { searchQuery } = this.state;
//     return (
//       <SearchBar>
//         <SearchForm onSubmit={this.onFormSubmit}>
//           <SearchFormBtn type="submit">
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormBtn>

//           <SearchFormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.onInputChange}
//             value={searchQuery}
//           />
//         </SearchForm>
//       </SearchBar>
//     );
//   }
// }

// export default Searchbar;
