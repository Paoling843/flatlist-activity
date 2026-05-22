import React, { useState } from "react";

import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { inventoryData } from "../data/inventoryData";

export default function Index() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    "All",
    "Office Supply",
    "Medical Supply",
    "Electronics",
    "Furniture",
    "Asset",
    "Consumable",
  ];

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Out of Stock":
        return "red";

      case "Critical":
        return "orange";

      case "Low Stock":
        return "gold";

      default:
        return "green";
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.itemName}</Text>

      <Text>Category: {item.category}</Text>

      <Text>Quantity: {item.quantity}</Text>

      <Text>Price: ₱{item.price}</Text>

      <Text
        style={{
          color: getStatusColor(item.status),
          fontWeight: "bold",
        }}
      >
        Status: {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Inventory Management System</Text>

      <Text style={styles.count}>
        Total Inventory Count: {filteredData.length}
      </Text>


      <TextInput
        placeholder="Search item..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />


      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListHeaderComponent={
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === item && styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No inventory items found</Text>
        }
        ListFooterComponent={
          <Text style={styles.footer}>End of Inventory List</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  count: {
    marginBottom: 10,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    marginBottom: 10,
  },

  categoryButton: {
    backgroundColor: "#ddd",
    padding: 10,
    marginRight: 8,
    marginBottom: 10,
  },

  activeCategory: {
    backgroundColor: "#bcb9b9",
  },

  categoryText: {
    color: "#000",
  },

  card: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },

  footer: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 12,
  },
});
