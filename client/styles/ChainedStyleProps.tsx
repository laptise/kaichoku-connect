import { CSSProperties } from "react";

type CspInitiable = {
  /**Initiate with Display flex */
  get Flex(): ChainedFlexBoxProps;
  /**Initiate with Size */
  get Size(): ChainedSizeProps;
  /**Initiate with Box */
  get Box(): ChainedBoxProps;
  /**Initiate with Border */
  get Border(): ChainedBorderProps;
  /**Initiate with Text */
  get Text(): ChainedTextProps;
};

/**CSP Initiator */
class CspInitiator implements CspInitiable {
  public get Flex() {
    return new ChainedFlexBoxProps();
  }
  public get Size() {
    return new ChainedSizeProps();
  }
  public get Box() {
    return new ChainedBoxProps();
  }
  public get Border() {
    return new ChainedBorderProps();
  }
  public get Text() {
    return new ChainedTextProps();
  }
}

/**Initiate Chained Style Properties */
export const csp = () => new CspInitiator();

abstract class ChainedStylePropsCore implements CspInitiable {
  constructor(protected keyProps: CSSProperties = {}, protected parent: ChainedStylePropsCore | null = null) {}
  get style() {
    return this.end();
  }
  private end() {
    const res = this.getRecursive();
    return res;
  }
  private getRecursive(tree: ChainedStylePropsCore[] = [this]): CSSProperties {
    const parent = this.parent;
    return parent?.parent ? parent.getRecursive([...tree, this]) : tree.reduce((props, t) => ({ ...props, ...t.keyProps }), {});
  }
  protected getParent() {
    return this.parent;
  }
  public get Flex() {
    return new ChainedFlexBoxProps(this.style);
  }
  public get Size() {
    return new ChainedSizeProps(this.style);
  }
  public get Box() {
    return new ChainedBoxProps(this.style);
  }
  public get Border() {
    return new ChainedBorderProps(this.style);
  }
  public get Text() {
    return new ChainedTextProps(this.style);
  }
}

export class ChainedFlexBoxProps extends ChainedStylePropsCore {
  constructor(keyProps: CSSProperties = {}) {
    super({ ...keyProps, display: "flex" });
  }
  /**Set flex direction to Row */
  get row() {
    this.keyProps.flexDirection = "row";
    return this;
  }
  /**Set flex direction to Column */
  get column() {
    this.keyProps.flexDirection = "column";
    return this;
  }
  /**Set gap spacing size */
  gap(gap: number) {
    this.keyProps.gap = gap;
    return this;
  }
  get topAlign() {
    if (this.keyProps.flexDirection === "row") {
      this.keyProps.alignItems = "flex-start";
    } else if (this.keyProps.flexDirection === "column") {
      this.keyProps.justifyContent = "flex-start";
    }
    return this;
  }
  get bottomAlign() {
    if (this.keyProps.flexDirection === "row") {
      this.keyProps.alignItems = "flex-end";
    } else if (this.keyProps.flexDirection === "column") {
      this.keyProps.justifyContent = "flex-end";
    }
    return this;
  }
  get verticalCenterAlign() {
    if (this.keyProps.flexDirection === "row") {
      this.keyProps.alignItems = "center";
    } else if (this.keyProps.flexDirection === "column") {
      this.keyProps.justifyContent = "center";
    }
    return this;
  }
  get horizontalCenterAlign() {
    if (this.keyProps.flexDirection === "row") {
      this.keyProps.justifyContent = "center";
    } else if (this.keyProps.flexDirection === "column") {
      this.keyProps.alignItems = "center";
    }
    return this;
  }
}

export class ChainedSizeProps extends ChainedStylePropsCore {
  constructor(keyProps: CSSProperties = {}) {
    super({ ...keyProps });
  }
  public width(px: number | string) {
    this.keyProps.width = px;
    return this;
  }
  public height(px: number | string) {
    this.keyProps.height = px;
    return this;
  }
  public minHeight(px: number | string) {
    this.keyProps.minHeight = px;
    return this;
  }
  public minWidth(px: number | string) {
    this.keyProps.width = px;
    return this;
  }
  public maxWidth(px: number | string) {
    this.keyProps.maxWidth = px;
    return this;
  }
  public maxHeight(px: number | string) {
    this.keyProps.maxHeight = px;
    return this;
  }
}

export class ChainedBoxProps extends ChainedStylePropsCore {
  constructor(keyProps: CSSProperties = {}) {
    super({ ...keyProps });
  }
  public padding(px: number | string) {
    this.keyProps.padding = px;
    return this;
  }
  public margin(px: number | string) {
    this.keyProps.margin = px;
    return this;
  }
}

export class ChainedBorderProps extends ChainedStylePropsCore {
  constructor(keyProps: CSSProperties = {}) {
    super({ ...keyProps });
  }
  public radius(px: number | string) {
    this.keyProps.borderRadius = px;
    return this;
  }
  public width(px: number | string) {
    this.keyProps.borderWidth = px;
    return this;
  }
}

export class ChainedTextProps extends ChainedStylePropsCore {
  constructor(keyProps: CSSProperties = {}) {
    super({ ...keyProps });
  }
  public fontSize(value: number | string) {
    this.keyProps.fontSize = value;
  }
  public overFlow(value: any) {
    this.keyProps.textOverflow = value;
  }
  public whiteSpace(value: any) {
    this.keyProps.whiteSpace = value;
  }
}
