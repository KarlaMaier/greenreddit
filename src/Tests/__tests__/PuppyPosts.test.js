import React from "react";
import { shallow } from "enzyme";
import PuppyPosts from "../PuppyPosts";

describe("<PuppyPosts />", () => {
  it("renders without crashing", () => {
    shallow(<PuppyPosts searchQuery="" />);
  });

  it("displays loading state", () => {
    const wrapper = shallow(<PuppyPosts searchQuery="" />);
    wrapper.setState({ loading: true });
    expect(wrapper.find(".loading").text()).toBe("Loading...");
  });

  it("displays error message", () => {
    const wrapper = shallow(<PuppyPosts searchQuery="" />);
    wrapper.setState({ error: new Error("Test error") });
    expect(wrapper.find(".error").text()).toBe(
      "Error loading posts: Test error"
    );
  });

  it("displays posts", () => {
    const posts = [
      {
        data: {
          id: "1",
          title: "Puppy Post",
          permalink: "/r/puppy/1",
          url: "http://example.com/image.jpg",
        },
      },
    ];
    const wrapper = shallow(<PuppyPosts searchQuery="" />);
    wrapper.setState({ posts, loading: false });
    expect(wrapper.find(".post-title").text()).toBe("Puppy Post");
    expect(wrapper.find("img").prop("src")).toBe(
      "http://example.com/image.jpg"
    );
  });

  // Add additional tests for caching and debouncing if necessary
});
