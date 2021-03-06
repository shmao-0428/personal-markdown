# bat文件同时打多个CMD窗口且执行多条命令

 -  命令1 & 命令2 & 命令3 ...      (无论前面命令是否故障,照样执行后面)  
 -  命令1 && 命令2 && 命令3....   (仅当前面命令成功时,才执行后面)  
 -  命令1 || 命令2 || 命令3....       (仅当前面命令失败时.才执行后面)

**步骤**

1、**start** 用来启动一个应用

2、**cmd /k** 表示cmd后面的命令执行完后不关闭窗口。如果要在执行完成后关闭窗口可以用/c 。

3、**"命令1&&命令2&&.."** 将要执行的多条命令使用引号全部包起来，并且在命令间用&&分隔。如果只有一条命令则不用引号也可以。

```bash
@echo off
start cmd /k "cd D:\Legend\server&&echo 第一个窗口&&forever mainApp.js"
start cmd /k "cd D:\Legend\server&&echo 第二个窗口&&forever viewApp.js"
start cmd /k "cd D:\Legend\server&&echo 第三个窗口&&forever serverApp.js"
pause
```

 **cmd查看环境变量**
```
1、查看当前所有可用的环境变量：输入 set 即可查看。
2、查看某个环境变量：输入 “set 变量名”即可，比如想查看path变量的值，即输入 set path
3、修改环境变量 ：输入 “set 变量名=变量内容”即可，比如将path设置为“d:\hacker.exe”，只要输入set path="d:\nmake.exe"。注意，此修改环境变量是指用现在的内容去覆盖以前的内容，并不是追加。比如当我设置了上面的path路径之后，如果我再重新输入set path="c"，再次查看path路径的时候，其值为“c:”，而不是“d:\nmake.exe”;“c”。
4、设置为空：如果想将某一变量设置为空，输入“set 变量名=”即可。如“set path=” 那么查看path的时候就为空。注意，上面已经说了，只在当前命令行窗口起作用。因此查看path的时候不要去右击“我的电脑”——“属性”........
5、给变量追加内容（不同于3，那个是覆盖）：输入“set 变量名=%变量名%;变量内容”。如，为path添加一个新的路径，输入“ set path=%path%;d:\hacker.exe”即可将d:\hacker.exe添加到path中，再次执行"set path=%path%;c:"，那么，使用set path语句来查看的时候，将会有：d:\hacker.exe;c:，而不是像第3步中的只有c:。

%ALLUSERSPROFILE% 局部 返回所有“用户配置文件”的位置。
%APPDATA% 局部 返回默认情况下应用程序存储数据的位置。
%CD% 局部 返回当前目录字符串。
%CMDCMDLINE% 局部 返回用来启动当前的 Cmd.exe 的准确命令行。
%CMDEXTVERSION% 系统 返回当前的“命令处理程序扩展”的版本号。
%COMPUTERNAME% 系统 返回计算机的名称。
%COMSPEC% 系统 返回命令行解释器可执行程序的准确路径。
%DATE% 系统 返回当前日期。使用与 date /t 命令相同的格式。由 Cmd.exe 生成。有关 date 命令的详细信息，请参阅 Date。
%ERRORLEVEL% 系统 返回最近使用过的命令的错误代码。通常用非零值表示错误。
%HOMEDRIVE% 系统 返回连接到用户主目录的本地工作站驱动器号。基于主目录值的设置。用户主目录是在“本地用户和组”中指定的。
%HOMEPATH% 系统 返回用户主目录的完整路径。基于主目录值的设置。用户主目录是在“本地用户和组”中指定的。
%HOMESHARE% 系统 返回用户的共享主目录的网络路径。基于主目录值的设置。用户主目录是在“本地用户和组”中指定的。
%LOGONSEVER% 局部 返回验证当前登录会话的域控制器的名称。
%NUMBER_OF_PROCESSORS% 系统 指定安装在计算机上的处理器的数目。
%OS% 系统 返回操作系统的名称。Windows 2000 将操作系统显示为 Windows_NT。
%PATH% 系统 指定可执行文件的搜索路径。
%PATHEXT% 系统 返回操作系统认为可执行的文件扩展名的列表。
%PROCESSOR_ARCHITECTURE% 系统 返回处理器的芯片体系结构。值: x86，IA64。
%PROCESSOR_IDENTFIER% 系统 返回处理器说明。
%PROCESSOR_LEVEL% 系统 返回计算机上安装的处理器的型号。
%PROCESSOR_REVISION% 系统 返回处理器修订号的系统变量。
%PROMPT% 局部 返回当前解释程序的命令提示符设置。由 Cmd.exe 生成。
%RANDOM% 系统 返回 0 到 32767 之间的任意十进制数字。由 Cmd.exe 生成。
%SYSTEMDRIVE% 系统 返回包含 Windows XP 根目录（即系统根目录）的驱动器。
%SYSTEMROOT% 系统 返回 Windows XP 根目录的位置。
%TEMP% and %TMP% 系统和用户 返回对当前登录用户可用的应用程序所使用的默认临时目录。有些应用程序需要 TEMP，而其它应用程序则需要 TMP。
%TIME% 系统 返回当前时间。使用与 time /t 命令相同的格式。由 Cmd.exe 生成。有关 time 命令的详细信息，请参阅 Time。
%USERDOMAIN% 局部 返回包含用户帐户的域的名称。
%USERNAME% 局部 返回当前登录的用户的名称。
%UserProfile% 局部 返回当前用户的配置文件的位置。
%WINDIR% 系统 返回操作系统目录的位置。
```
# 参考

1. [bat文件同时打多个CMD窗口且执行多条命令](https://blog.csdn.net/qq15577969/article/details/103835153)
2. [Windows CMD命令大全](https://www.cnblogs.com/accumulater/p/7110811.html)
3. [Bat脚本编写以及cmd命令](https://blog.csdn.net/miracle_8/article/details/78909093)

