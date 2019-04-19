<template>
  <div id='sample'>
    <div style='width: 100%;height:100vh; display: flex; justify-content: space-between;'>
      <div id='myPaletteDiv'></div>
      <div id='myDiagramDiv'></div>
      <div id='myInspector'>
        <!--画布属性区--开始-->
        <div v-if='!isNodeSelected'>
          <h4 class='diagram-attribute-pannel-title'>资源编排模板</h4>
          <div class='diagram-attribute-pannel-content'>
            <div class='attribute-title'>
              基本属性
            </div>
            <div>
              <ul>
                <li>
                  <label>版本</label>
                  <input type='text'>
                </li>
                <li>
                  <label>描述</label>
                  <input type='text' class='form-control'>
                </li>
              </ul>


            </div>
          </div>
        </div>
        <!--画布属性区--结束-->
        <!--节点属性编辑区--开始-->
        <div v-else>
          <h4 class='diagram-attribute-pannel-title'>资源属性</h4>
          <div class='diagram-attribute-pannel-content'>
            <div class='attribute-title'>
              基本属性
            </div>
            <div class='attribute-title'>
              资源属性
            </div>
          </div>
        </div>
        <!--节点属性编辑区--结束-->
      </div>
    </div>
    <p style='display: none'>
      <button id='SaveButton' @click='save()'>Save</button>
      <button @click='load()'>Load</button>
      Diagram Model saved in JSON format:
      <textarea id='mySavedModel' style='width:100%;height:300px;'>
{ "class": "GraphLinksModel",
  "nodeDataArray": [ ],
  "linkDataArray": []}
  </textarea>

      <button @click='printDiagram()'>Print Diagram Using SVG</button>
    </p>
  </div>
</template>
<style>
  h4 {
    margin: 0;
  }
  li {
    list-style:none
  }

  .diagram-attribute-pannel-title {
    font-size: 14px;
    color: #333333;
    background-color: #f5f5f5;
    border-color: #dddddd;
    border-bottom: solid 1px #dddddd;
    padding: 10px 15px;
    border-left: solid 2px #000;
  }

  .diagram-attribute-pannel-content {
    padding: 10px;
    height: 100%;
    /*overflow: hidden;*/
    /*overflow-y: auto;*/
  }
  .attribute-title {
    border-bottom: 1px solid #333;
    font-size: 13px;
    margin-bottom: 10px;
    cursor: pointer;
  }


</style>
<script>
  import go from 'gojs'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        myDiagram: null, // 画布
        myPalette: null, // 菜单
        menuParams: [  // specify the contents of the Palette
          {category: 'Picture', type: 'NAS'},
          {category: 'Picture', type: 'ECS'},
          {category: 'Picture', type: 'CBS'}
        ], // 菜单配置
        config: {
          NAS: {
            _comment: 'NAS产品配置',
            text: 'NAS',
            source: require('./pic/NAS.png'),
            inNodeType: ['ECS', 'CBS']
          },
          ECS: {
            _comment: 'ECS产品配置',
            text: 'ECS',
            source: require('./pic/ECS.png'),
            inNodeType: [],
            properies: [
              {
                cnName: 'IP',
                type: 'text',
                valName: 'ip',
                value: '',
              },
              {
                cnName: 'CPU核数',
                type: 'select',
                valName: 'cpuNo',
                value: '',
                remoteFilters: false, // 是否远程获取过滤条件
                remoteAPI: '', // 获取筛选数据接口
                displayName: '', // 展示字段(获取条件接口中该字段值作为展示字段)
                filterValue: '',   // 展示字段对应值(获取条件接口中该字段作为传递至接口字段值)
                filterLists: [
                  {label: '1核', value: 1},
                  {label: '2核', value: 2},
                  {label: '3核', value: 3},
                ]
              },
              {
                cnName: '租户',
                type: 'select',
                valName: 'tenantId',
                value: '',
                remoteFilters: true, // 是否远程获取过滤条件
                remoteAPI: 'manage.zone.host_manage.CRUD', // 获取筛选数据接口
                displayName: 'hostname', // 展示字段(获取条件接口中该字段值作为展示字段)
                filterValue: 'hostname',   // 展示字段对应值(获取条件接口中该字段作为传递至接口字段值)
                filterLists: []
              }

            ]
          },
          CBS: {
            _comment: 'CBS产品配置',
            text: 'CBS',
            source: require('./pic/CBS.png'),
            inNodeType: [],
          }
        }, // 菜单属性配置

        // 节点属性配置-开始
        isNodeSelected: false, // 影响属性编辑区显示
        // 节点属性配置-结束
      }
    },
    props: {
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // if (window.goSamples) goSamples()  // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make  // for conciseness in defining templates

        this.myDiagram =
          $(go.Diagram, 'myDiagramDiv',  // must name or refer to the DIV HTML element
            {
              'LinkDrawn': showLinkLabel,  // this DiagramEvent listener is defined below
              'LinkRelinked': showLinkLabel,
              'undoManager.isEnabled': true,  // enable undo & redo
              nodeSelectionAdornmentTemplate:
                $(go.Adornment, 'Auto',
                  // { layerName: 'Grid' },  // the predefined layer that is behind everything else
                  $(go.Shape, 'Rectangle', {fill: 'white', stroke: null}),
                  // $(go.Placeholder)
                ),
              grid: $(go.Panel, 'Grid',
                {gridCellSize: new go.Size(10, 10)},
                $(go.Shape, 'LineH', {stroke: '#F5F5F5'}),
                $(go.Shape, 'LineV', {stroke: '#F5F5F5'})
              ),
              // For this sample, automatically show the state of the diagram's model on the page
              'ModelChanged': (e) => {
                if (e.isTransactionFinished) {
                  document.getElementById('mySavedModel').textContent = this.myDiagram.model.toJson()
                }
              },
            }
          )

        // when the document is modified, add a '*' to the title and enable the 'Save' button
        this.myDiagram.addDiagramListener('Modified', () => {
          // console.log(e)
          var button = document.getElementById('SaveButton')
          if (button) button.disabled = !this.myDiagram.isModified
          var idx = document.title.indexOf('*')
          if (this.myDiagram.isModified) {
            if (idx < 0) document.title += '*'
          } else {
            if (idx >= 0) document.title = document.title.substr(0, idx)
          }
        })

        // 节点选中事件
        this.myDiagram.addDiagramListener('ObjectSingleClicked', (e) => {
          this.isNodeSelected = true
          console.log(e.subject.part.data)
        })

        // 监听连线事件
        this.myDiagram.addDiagramListener('LinkDrawn', (e) => {
          var res = this.manageLines(e.subject.part)
          if (res) {
            this.myDiagram.commandHandler.deleteSelection()
          }
        })

        // 监听连线事件
        this.myDiagram.addDiagramListener('BackgroundSingleClicked', (e) => {
          this.isNodeSelected = false
          console.log('选中背景板',e)
        })

        // helper definitions for node templates

        function nodeStyle() {
          return [
            // The Node.location comes from the 'loc' property of the node data,
            // converted by the Point.parse static method.
            // If the Node.location is changed, it updates the 'loc' property of the node data,
            // converting back using the Point.stringify static method.
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            {
              // the Node.location is at the center of each node
              locationSpot: go.Spot.Center
            }
          ]
        }

        // Define a function for creating a 'port' that is normally transparent.
        // The 'name' is used as the GraphObject.portId,
        // the 'align' is used to determine where to position the port relative to the body of the node,
        // the 'spot' is used to control how links connect with the port and whether the port
        // stretches along the side of the node,
        // and the boolean 'output' and 'input' arguments control whether the user can draw links from or to the port.
        function makePort(name, align, spot, output, input) {
          var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
          // the port is basically just a transparent rectangle that stretches along the side of the node,
          // and becomes colored when the mouse passes over it
          return $(go.Shape,
            'Circle',
            {
              fill: 'transparent',  // changed to a color in the mouseEnter event handler
              strokeWidth: 0,  // no stroke
              width: 18,  // if not stretching horizontally, just 8 wide
              height: 18,  // if not stretching vertically, just 8 tall
              alignment: align,  // align the port on the main Shape
              stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
              portId: name,  // declare this object to be a 'port'
              fromSpot: spot,  // declare where links may connect at this port
              fromLinkable: output,  // declare whether the user may draw links from here
              toSpot: spot,  // declare where links may connect at this port
              toLinkable: input,  // declare whether the user may draw links to here
              cursor: 'pointer',  // show a different cursor to indicate potential link point
              mouseEnter: function (e, port) {  // the PORT argument will be this Shape
                if (!e.diagram.isReadOnly) port.fill = 'red'
              },
              mouseLeave: function (e, port) {
                port.fill = 'transparent'
              }
            })
        }

        function textStyle() {
          return {
            font: 'bold 11pt Helvetica, Arial, sans-serif',
            stroke: 'whitesmoke'
          }
        }

        // define the Node templates for regular nodes

        this.myDiagram.nodeTemplateMap.add('',  // the default category
          $(go.Node, 'Table', nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            $(go.Panel, 'Auto',
              $(go.Shape, 'Rectangle',
                {fill: '#00A9C9', strokeWidth: 0},
                new go.Binding('figure', 'figure')),
              $(go.TextBlock, textStyle(),
                {
                  margin: 8,
                  maxSize: new go.Size(160, NaN),
                  wrap: go.TextBlock.WrapFit,
                  editable: true
                },
                new go.Binding('text').makeTwoWay())
            ),
            {
              contextMenu:                            // define a context menu for each node
                $('ContextMenu', 'Spot',              // that has several buttons around
                  $(go.Placeholder, {padding: 5}),  // a Placeholder object
                  $('ContextMenuButton', $(go.TextBlock, 'Top'),
                    {alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom, click: cmCommand}),
                  $('ContextMenuButton', $(go.TextBlock, 'Right'),
                    {alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, click: cmCommand}),
                  $('ContextMenuButton', $(go.TextBlock, 'Bottom'),
                    {alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top, click: cmCommand}),
                  $('ContextMenuButton', $(go.TextBlock, 'Left'),
                    {alignment: go.Spot.Left, alignmentFocus: go.Spot.Right, click: cmCommand})
                )  // end Adornment
            },
            // four named ports, one on each side:
            makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
            makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
            makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
            makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false)
          ))

        this.myDiagram.nodeTemplateMap.add('Picture',
          $(go.Node, 'Table',
            nodeStyle(),
            // { background: 'white' },
            $(go.Picture,
              // Pictures 应该指定宽高.
              // 当没有图片时显示红色的背景
              // 或者当图片为透明的时候也是.
              // {background: '#f5f5f5' },
              // Picture.source参数值与模型数据中的'source'字段绑定
              new go.Binding('source'),
            ),
            $(go.TextBlock,
              'Default Text',  // 初始化默认文本
              // 文字周围的空隙, 大号字体, 白色笔画:
              {row: 1, stroke: 'black', font: 'bold 12px sans-serif', background: '#f5f5f5'},
              // TextBlock.text参数值与模型数据中的'name'字段绑定
              new go.Binding('text', 'text')),
            // {
            //     contextMenu:                            // define a context menu for each node
            //         $('ContextMenu', 'Spot',              // that has several buttons around
            //             $(go.Placeholder, { padding: 5 }),  // a Placeholder object
            //             $('ContextMenuButton', $(go.TextBlock, 'Top'),
            //                 { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom, click: cmCommand }),
            //             $('ContextMenuButton', $(go.TextBlock, 'Right'),
            //                 { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, click: cmCommand }),
            //             $('ContextMenuButton', $(go.TextBlock, 'Bottom'),
            //                 { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top, click: cmCommand }),
            //             $('ContextMenuButton', $(go.TextBlock, 'Left'),
            //                 { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right, click: cmCommand })
            //         )  // end Adornment
            // },
            // three named ports, one on each side except the top, all output only:
            makePort('T', go.Spot.Top, go.Spot.Top, true, true),
            makePort('L', go.Spot.Left, go.Spot.Left, true, true),
            makePort('R', go.Spot.Right, go.Spot.Right, true, true),
            makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, true)
          ),
        )


// this is a shared context menu button click event handler, just for demonstration
        function cmCommand(e, obj) {
          var node = obj.part.adornedPart  // the Node with the context menu
          var buttontext = obj.elt(1)  // the TextBlock
          alert(buttontext.text + ' command on ' + node.data.key)
        }


        // replace the default Link template in the linkTemplateMap
        this.myDiagram.linkTemplate =
          $(go.Link,  // the whole link panel
            {
              routing: go.Link.AvoidsNodes,
              curve: go.Link.JumpOver,
              corner: 5, toShortLength: 4,
              relinkableFrom: true,
              relinkableTo: true,
              reshapable: true,
              resegmentable: true,
              // mouse-overs subtly highlight links:
              mouseEnter: function (e, link) {
                link.findObject('HIGHLIGHT').stroke = '#c7c7c7'
              },
              mouseLeave: function (e, link) {
                link.findObject('HIGHLIGHT').stroke = 'transparent'
              },
              selectionAdorned: false,
              selectable: true,
            },
            new go.Binding('points').makeTwoWay(),
            $(go.Shape,  // the highlight shape, normally transparent
              {isPanelMain: true, strokeWidth: 8, stroke: 'transparent', name: 'HIGHLIGHT'}),
            $(go.Shape,  // the link path shape
              {isPanelMain: true, stroke: 'gray', strokeWidth: 2},
              new go.Binding('stroke', 'isSelected', function (sel) {
                return sel ? 'red' : 'black'
              }).ofObject()),
            $(go.Shape,  // the arrowhead
              {toArrow: 'standard', strokeWidth: 0, fill: 'gray'}),
            $(go.Panel, 'Auto',  // the link label, normally not visible
              {visible: false, name: 'LABEL', segmentIndex: 2, segmentFraction: 0.5},
              new go.Binding('visible', 'visible').makeTwoWay(),
              $(go.Shape, 'RoundedRectangle',  // the label shape
                {fill: '#F8F8F8', strokeWidth: 0}),
              $(go.TextBlock, 'Yes',  // the label
                {
                  textAlign: 'center',
                  font: '10pt helvetica, arial, sans-serif',
                  stroke: '#333333',
                  editable: true
                },
                new go.Binding('text').makeTwoWay())
            )
          )

        // Make link labels visible if coming out of a 'conditional' node.
        // This listener is called by the 'LinkDrawn' and 'LinkRelinked' DiagramEvents.
        function showLinkLabel(e) {
          var label = e.subject.findObject('LABEL')
          if (label !== null) label.visible = (e.subject.fromNode.data.category === 'Conditional')
        }

        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        this.myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal
        this.myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal

        // this.load()  // load an initial diagram from some JSON text

        // initialize the Palette that is on the left side of the page
        this.myPalette =
          $(go.Palette, 'myPaletteDiv',  // must name or refer to the DIV HTML element
            {
              nodeTemplateMap: this.myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
              model: new go.GraphLinksModel(
                this.initPaletteConfig()
              )
            })
      }, // end init
      // 处理连线问题
      manageLines(part) {
        var fromNodeType = part.fromNode.jb.type
        var inNodeType = part.toNode.jb.inNodeType
        if (inNodeType.includes(fromNodeType)) {
          return false
        }
        return true
      },
      // 节点信息初始化
      initPaletteConfig() {
        this.menuParams = this.menuParams.filter((val) => {
          return Object.assign(val, this.config[val.type])
        })
        return this.menuParams
      },
      // Show the diagram's model in JSON format that the user may edit
      save() {
        document.getElementById('mySavedModel').value = this.myDiagram.model.toJson()
        this.myDiagram.isModified = false
      },
      load() {
        this.myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value)
      },
      // print the diagram by opening a new window holding SVG images of the diagram contents for each page
      printDiagram() {
        var svgWindow = window.open()
        if (!svgWindow) return  // failure to open a new Window
        var printSize = new go.Size(700, 960)
        var bnds = this.myDiagram.documentBounds
        var x = bnds.x
        var y = bnds.y
        while (y < bnds.bottom) {
          while (x < bnds.right) {
            var svg = this.myDiagram.makeSVG({scale: 1.0, position: new go.Point(x, y), size: printSize})
            svgWindow.document.body.appendChild(svg)
            x += printSize.width
          }
          x = bnds.x
          y += printSize.height
        }
        setTimeout(function () {
          svgWindow.print()
        }, 1)
      }

    }
  }
</script>

<style scoped>
  #myPaletteDiv {
    width: 100px;
    margin-right: -1px;
    background-color: white;
    border: solid 1px #E9E9E9;
  }
  #myDiagramDiv {
    flex-grow: 1;
    height: 100%;
    border: solid 1px #E9E9E9;;
  }
  #myInspector {
    text-align: left;
    width: 250px;
    margin-left:-1px;
    margin-right: 2px;
    background-color: white;
    border-left: solid 1px #999;
    box-shadow: -1px 0px 10px #ccc;
  }
</style>
