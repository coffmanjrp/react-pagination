const List = ({ lists, currentPage, itemsPerPage }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  const currentItems = lists.slice(indexOfFistItem, indexOfLastItem);

  return (
    <ol>
      {currentItems.map((item) => (
        <li key={item.id}>
          {item.id}. {item.title}
        </li>
      ))}
    </ol>
  );
};

export default List;
