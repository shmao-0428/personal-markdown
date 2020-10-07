# 通过@each生成flex布局类名

**flex.scss**

```scss
.d-flex {
  display: flex;
}

$fd: (
  row: row,
  row-reverse: row-reverse,
  column: column,
  column-reverse: column-reverse,
);

$fw: (
  nowrap: nowrap,
  wrap: wrap,
  wrap-reverse: wrap-reverse,
);

$jc: (
  start: flex-start,
  end: flex-end,
  center: center,
  between: space-between,
  around: space-around,
);

$ai: (
  start: flex-start,
  end: flex-end,
  center: center,
  baseline: baseline,
  stretch: stretch,
);

@each $key, $value in $fd {
  .fd-#{$key} {
    flex-direction: $value;
  }
}

@each $key, $value in $fw {
  .fw-#{$key} {
    flex-wrap: $value;
  }
}

@each $key, $value in $jc {
  .jc-#{$key} {
    justify-content: $value;
  }
}

@each $key, $value in $ai {
  .ai-#{$key} {
    align-items: $value;
  }
}

```

