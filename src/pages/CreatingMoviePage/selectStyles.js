export const customStyles = {
  option: (base, state) => ({
    ...base,
    color: `rgb(117, 117, 117)`,
    fontFamily: 'Manrope-500',
    fontSize: 16,
    lineHeight: 1.25,
    paddingLeft: 20,
    paddingTop: 8,
    '&:hover': {
      backgroundColor: '#C5C5C5',
    },
    backgroundColor: state.isSelected ? '#C5C5C5' : 'white',
    borderRadius: 14,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  control: base => ({
    ...base,
    minHeight: 40,
    width: 300,
    borderRadius: 10,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    color: '#121417',
  }),
  menuList: base => ({
    ...base,
    '::-webkit-scrollbar': {
      width: 8,
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      background: '#f1f1f1',
    },
    '::-webkit-scrollbar-track': {
      marginTop: 14,
      marginBottom: 14,
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#BFBEB6',
    },
  }),
  menu: base => ({
    ...base,
    paddingRight: 8,
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(18, 20, 23, 0.05)',
    boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02);',
  }),
  placeholder: base => ({
    ...base,
    fontFamily: 'Manrope-500',
    fontSize: 18,
  }),
};
