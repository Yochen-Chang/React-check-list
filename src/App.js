import "./App.css";
import { useState } from "react";

export default function App() {
  const [itemList, setItemList] = useState([
    ["Check Item1", false],
    ["Check Item2", false],
  ]);
  return (
    <div className="container">
      <h1>Check List Project</h1>
      <ul className="check-list">
        <CheckList
          itemlist={itemList}
          onDeleteItem={deleteItem}
          onEditItem={editItem}
          onCheckItem={checkItem}
        />
      </ul>
      <button itemlist={itemList} onClick={AddItemToCheckList}>
        Add new check item
      </button>
    </div>
  );

  function AddItemToCheckList() {
    setItemList([...itemList, ["Check Item new", false]]);
  }

  function deleteItem(index) {
    setItemList(itemList.filter((_, i) => i !== index));
  }

  function editItem(index, newText) {
    const updatedItems = itemList.map((item, i) =>
      i === index ? [newText, item[1]] : item
    );
    setItemList(updatedItems);
  }

  function checkItem(index, status) {
    const updatedItems = itemList.map((item, i) =>
      i === index ? [item[0], status] : item
    );
    setItemList(updatedItems);
  }
}

export function CheckList({ itemlist, onDeleteItem, onEditItem, onCheckItem }) {
  const itemListContent = itemlist.map((value, i) => {
    return (
      <CheckItem
        key={i}
        index={i}
        content={value[0]}
        checked={value[1]}
        onDelete={onDeleteItem}
        onEdit={onEditItem}
        onCheck={onCheckItem}
      />
    );
  });

  return <>{itemListContent}</>;
}

export function CheckItem({
  index,
  content,
  checked,
  onDelete,
  onEdit,
  onCheck,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    onEdit(index, editContent);
    setIsEditing(false);
  }

  function checkStatusChange() {
    onCheck(index, !checked);
  }

  return (
    <li className={`check-item ${checked ? "checked" : ""}`}>
      <input type="checkbox" value={checked} onClick={checkStatusChange} />
      {/* <button
        className="btn btn-check"
        value={checked}
        onClick={checkStatusChange}
      ></button> */}
      {isEditing ? (
        <>
          <input
            className="item-content"
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-cancel"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="item-content">{content}</span>
          <button className="btn btn-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={() => onDelete(index)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}
