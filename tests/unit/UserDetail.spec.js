import { mount } from "@vue/test-utils";
import UserDetail from "@/components/UserDetail.vue";

describe("UserDetail.vue", () => {
  it("renders user details correctly", () => {
    const user = {
      name: { title: "Mr", first: "John", last: "Doe" },
      email: "john.doe@example.com",
      cell: "123-456-7890",
      location: {
        street: { number: 123, name: "Main St" },
        city: "Anytown",
        state: "Anystate",
        country: "AnyCountry",
      },
      dob: { age: 30 },
      picture: { large: "https://example.com/john-doe.jpg" },
    };

    const wrapper = mount(UserDetail, {
      props: { user },
    });

    expect(wrapper.text()).toContain(user.name.first);
    expect(wrapper.text()).toContain(user.name.last);
    expect(wrapper.text()).toContain(user.email);
    expect(wrapper.text()).toContain(user.cell);
    expect(wrapper.text()).toContain(user.location.street.name);
    expect(wrapper.text()).toContain(user.location.city);
    expect(wrapper.text()).toContain(user.location.state);
    expect(wrapper.text()).toContain(user.location.country);
    expect(wrapper.text()).toContain(user.dob.age.toString());
    expect(wrapper.find("img").attributes("src")).toBe(user.picture.large);
  });
});
