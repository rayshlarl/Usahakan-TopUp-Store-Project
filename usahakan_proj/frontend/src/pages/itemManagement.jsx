import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemByProductName } from "../api";
import { deleteItemById } from "../api";
import { createItem } from "../api";
import { Header } from "../components/Header";
// Import from barrel file in item_management
import {
  BackButton,
  PageHeader,
  ItemCard,
} from "../components/item_management/index";
import { AddItemPortal } from "../components/portal/AddItemPortal/AddItem";
import { EditItemPortal } from "../components/portal/EditItemPortal/editItem";
import { useOrderAction } from "../hooks/useOrderAction";

// Main Component
const ItemManagement = () => {
  const { productName } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showAddItemPortal, setShowAddItemPortal] = useState(false);
  const [showEditItemPortal, setShowEditItemPortal] = useState(false);
  const [itemKey, setItemKey] = useState(); // --> diambil dari map.keys

  //Custom Hooks
  const { submitOrder } = useOrderAction();

  // Handle back navigation
  const handleBack = () => {
    navigate("/products");
  };

  // Handle open add item portal
  const handleOpenAddItemPortal = () => {
    console.log("Add item");
    setShowAddItemPortal(true);
  };
  // Handle close item portal
  const handleCloseAddItemPortal = () => {
    setShowAddItemPortal(false);
  };

  //Handler submit add data
  const getSubmitData = async (orderData) => {
    const response = await createItem(orderData);
    if (response.success) {
      window.location.reload();
    } else {
      console.error(err);
    }
  };

  // Handle Open edit item portal
  const handleOpenEditItem = async (itemId, itemIndex) => {
    setShowEditItemPortal(true);
    setItemKey(itemIndex);
  };
  // Handle Close edit item portal
  const handleCloseEditItemPortal = () => {
    setShowEditItemPortal(false);
    setItemKey(null);
  };

  // Handle delete item
  const handleDeleteItem = async (itemId) => {
    const isConfirmed = confirm("Yakin mau hapus item ini?");
    if (!isConfirmed) return;
    const response = await deleteItemById(itemId);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemByProductName(productName);
        setItems(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          {/* Back Navigation */}
          <BackButton onClick={handleBack} />

          {/* Page Header */}
          <PageHeader
            productName={productName}
            onAddItem={handleOpenAddItemPortal}
          />

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, key) => (
              <ItemCard
                key={key}
                itemKeyFromMap={key} // --> Ngirim item key
                item={item}
                onEdit={handleOpenEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>

          {/* Empty State */}
          {items.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">Belum ada item.</p>
              <button
                onClick={handleOpenAddItemPortal}
                className="mt-4 text-blue-500 hover:underline cursor-pointer"
              >
                Tambah item pertama
              </button>
            </div>
          )}
        </div>
        {showAddItemPortal && (
          <AddItemPortal
            onClose={handleCloseAddItemPortal}
            onSubmit={getSubmitData}
            productName={productName}
          />
        )}
        {showEditItemPortal && (
          <EditItemPortal
            onClose={handleCloseEditItemPortal}
            productName={productName}
            selectedItem={items}
            itemIndex={itemKey}
          />
        )}
      </div>
    </>
  );
};

export { ItemManagement };
