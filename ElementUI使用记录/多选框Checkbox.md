### el-checkbox的使用

[基础用法 ](https://element.eleme.cn/#/zh-CN/component/checkbox)

el-checkbox 有几种样式,分别会为其添加类名

- 禁用   is-disabled
- 按钮   类名  
- 边框   类名 is-bordered
- 选中   类名 is-checked
- 多选框的size(仅在border 存在的时候生效) 类名 `el-checkbox--medium / small / mini`

```html
 <label
    class="el-checkbox"
    :class="[
      border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    :id="id"
  >
    <span class="el-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="el-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
      <input
        v-else
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="el-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
```

### Demo

实际例子: 

通过v-for渲染一系列div并在每一个div的前面添加一个多选框,如下图

```html	
<div v-for="item in data">
    <el-checkbox-group v-model="checked">
        <el-checkbox label="item.id">
        	<i></i>
        </el-checkbox>
    </el-checkbox-group>
</div>
```

