import { shallowMount } from "@vue/test-utils";
import Card from "@/components/tailwind/Card.vue";

describe("Card.vue", () => {
  it("renders props.msg when passed", () => {
    const name = "";
    const wrapper = shallowMount(Card, {
      propsData: { name },
    });
    expect(wrapper.text()).toMatch(name);
  });
});
