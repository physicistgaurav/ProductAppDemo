import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");

const AvatarLayout = ({ size = 100, style }) => (
  <SkeletonLoader>
    <SkeletonLoader.Container
      style={[{ flex: 1, flexDirection: "row" }, style]}
    >
      <SkeletonLoader.Item
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          marginRight: 20,
        }}
      />
      <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
        <SkeletonLoader.Item
          style={{ width: 220, height: 20, marginBottom: 5 }}
        />
        <SkeletonLoader.Item style={{ width: 150, height: 20 }} />
      </SkeletonLoader.Container>
    </SkeletonLoader.Container>
  </SkeletonLoader>
);

export const PostLayout = () => (
  <SkeletonLoader style={{ marginVertical: 10 }}>
    <AvatarLayout style={{ marginBottom: 10 }} />

    <SkeletonLoader.Item
      style={{ width, height: height / 3.5, marginVertical: 10 }}
    />
  </SkeletonLoader>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
});
