// RandomUser.spec.js
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import RandomUsers from "@/components/RandomUsers.vue";

describe("RandomUsers.vue", () => {
  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error");
    errorSpy.mockImplementation(() => {});
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                name: { title: "Mr", first: "John", last: "Doe" },
                email: "test@testing.com",
                cell: "123-456-7890",
                location: {
                  street: { number: 123, name: "Main St" },
                  city: "Anytown",
                  state: "Anystate",
                  country: "AnyCountry",
                },
                dob: { age: 30 },
                picture: { medium: "https://example.com/john-doe.jpg" },
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("sets loading state during fetch", async () => {
    const wrapper = mount(RandomUsers);
    // At this point, the fetch operation should have started, so loading should be true
    expect(wrapper.vm.loading).toBe(true);
    await flushPromises();
    // After waiting for the fetch operation to complete, loading should be false
    expect(wrapper.vm.loading).toBe(false);
  });

  it("handles fetch errors", async () => {
    const mockError = new Error("Fetch error");
    global.fetch = jest.fn(() => Promise.reject(mockError));
    mount(RandomUsers);
    await flushPromises();
    expect(errorSpy).toHaveBeenCalledWith(mockError);
  });

  it('selects a user when "More Info" is clicked', async () => {
    const wrapper = mount(RandomUsers);
    await flushPromises();
    const user = wrapper.vm.users[0];
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.vm.selectedUser).toBe(user);
  });
});
