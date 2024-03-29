## Watch the usage

https://github.com/raywill/mockshow/assets/248295/7bb717c9-8b5c-44a8-8423-76235c90aa2d

Input sample script:

```
> OceanBase(admin@test)>
- load ai.gpt.model;
pause 3000
Query OK, 0 rows affected (3.000 sec)

> OceanBase(admin@test)>
- begin gpt session;
Query OK, 0 rows affected (0.001 sec)

> OceanBase(admin@test)>
- select OBGPT("我喜欢吃肉，你建议我中午吃什么?") as answer;
pause 2000
+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| answer                                                                                                                                                |
+-------------------------------------------------------------------------------------------------------------------------------------------------------+
| 中午你可以考虑吃牛肉汉堡搭配薯条、墨西哥肉卷、宫保鸡丁配米饭，或者意大利肉酱面。这些都是美味的肉食选择，既满足你对肉的喜爱，又方便快捷。记得搭配一些蔬菜保证营养均衡。            |
+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (2.031 sec)


> OceanBase(admin@test)>
- select OBGPT("我是中国人，比较喜欢吃猪肉类的。有好建议吗？") as answer;
pause 5400
+-----------------------------------------------------------------------------------------------------------------+
| answer                                                                                                          |
+-----------------------------------------------------------------------------------------------------------------+
| 午餐可以考虑红烧肉、糖醋里脊或鱼香肉丝搭配白米饭，口味丰富且符合中式口味。                                                  |
+-----------------------------------------------------------------------------------------------------------------+
1 row in set (5.400 sec)


> OceanBase(admin@test)>
- end gpt session;
Query OK, 0 rows affected (0.001 sec)
```

## Command

- `>`  prompt line. instant display the prompt content.
- `-`  typing line. emulate the typing process
- `pause ` pause command. emulate the calculation wait in mill-sec


## Live demo

Try it out at [https://raywill.github.io/mockshow/](https://raywill.github.io/mockshow/)
