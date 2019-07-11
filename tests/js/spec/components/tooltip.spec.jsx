import React from 'react';
import {mount} from 'enzyme';
import Tooltip from 'app/components/tooltip';

describe('Tooltip', function() {
  it('renders fallback', function() {
    const wrapper = mount(
      <Tooltip title="test">
        <span>My Button</span>
      </Tooltip>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders full tooltip', function() {
    const wrapper = mount(
      <Tooltip title="test">
        <span>My Button</span>
      </Tooltip>
    );
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('updates title', function() {
    const wrapper = mount(
      <Tooltip title="test">
        <span>My Button</span>
      </Tooltip>,
      TestStubs.routerContext()
    );

    wrapper.setProps({title: 'bar'});
    wrapper.update();
    const trigger = wrapper.find('span');
    trigger.simulate('mouseEnter');

    const tooltip = document.querySelector('#tooltip-portal .tooltip-content');
    // Check the text node.
    expect(tooltip.childNodes[0].nodeValue).toEqual('bar');

    trigger.simulate('mouseLeave');
  });

  it('disables and does not render', function() {
    const wrapper = mount(
      <Tooltip title="test" disabled>
        <span>My Button</span>
      </Tooltip>,
      TestStubs.routerContext()
    );
    const trigger = wrapper.find('span');
    trigger.simulate('mouseEnter');

    const tooltip = document.querySelector('#tooltip-portal .tooltip-content');
    expect(tooltip).toBeFalsy();

    trigger.simulate('mouseLeave');
  });

  it('does not render an empty tooltip', function() {
    const wrapper = mount(
      <Tooltip title="">
        <span>My Button</span>
      </Tooltip>,
      TestStubs.routerContext()
    );
    const trigger = wrapper.find('span');
    trigger.simulate('mouseEnter');

    const tooltip = document.querySelector('#tooltip-portal .tooltip-content');
    expect(tooltip).toBeFalsy();

    trigger.simulate('mouseLeave');
  });
});
